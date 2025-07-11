import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { RenderEmbeddedText } from "../components/RenderEmbeddedText";
import { Link } from "react-router-dom";

import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { SlGlobe } from "react-icons/sl";
import { BrandSlider } from "../components/BrandSlider";

export const About = () => {

  const api = import.meta.env.VITE_API_URL;
  const [about, setAbout] = useState({});
  const [brand, setBrand] = useState([]);
  const [videoSrc, setVideoSrc] = useState('');
  const [mute, setMute] = useState(false);  


  useEffect(()=>{    
    async function getData(){
      try{
        const res = await axios.get(api + '/aboutcms');
        const res2 = await axios.get(api + '/allbrands');                
              
        let newArr = res2.data.data.sort((a,b) => a.id - b.id)
        let arrWithPosition = newArr.map((obj, index)=>({
          ...obj,
          position: index % 3
        }))

        setAbout(res.data.data)
        setBrand(arrWithPosition)        
        
        sessionStorage.setItem("aboutData", JSON.stringify(res.data.data))                
        sessionStorage.setItem('allBrands', JSON.stringify(arrWithPosition))        
        
      }catch(err){
        console.log(err)
      }
    }

    const cacheData1 = sessionStorage.getItem('aboutData');
    const cacheData2 = sessionStorage.getItem('allBrands');
    if(cacheData1 && cacheData2){
      setAbout(JSON.parse(cacheData1))
      setBrand(JSON.parse(cacheData2))               
    }else{
      getData();      
    }
  },[])

  useEffect(()=>{
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const setVideo = () => {      
      setVideoSrc(
        mediaQuery.matches
          ? "https://res.cloudinary.com/dpxcgs7nr/video/upload/v1752239613/home-mobile_sai3wl.mp4"
          : "https://res.cloudinary.com/dpxcgs7nr/video/upload/v1752239597/home-desktop_bs5fsv.mp4"
      );        
    };

    setVideo()

    mediaQuery.addEventListener("change", setVideo);    
    return () => mediaQuery.removeEventListener("change", setVideo);

  }, [about])

  const [limitText, setLimitText] = useState('');
  const handleShowMoreBio = (person) =>{
    if(limitText != person){
      setLimitText(person)
    }else{
      setLimitText("")
    }
  }

  const videoRef = useRef(null);
  const bannerRef = useRef(null);  

  useEffect(() => {
    const checkHeight = () => {
      if (bannerRef.current) {        
        if(bannerRef.current.offsetHeight < (window.scrollY + 100)){
          videoRef.current.pause();
        }else{
          videoRef.current.play();
        }
      }      
    };
    window.addEventListener('scroll', checkHeight)
    return () => {
      window.removeEventListener('scroll', checkHeight);
    };

  }, []);

  const [loading, setLoading] = useState(true);
  const handleLoadingScreen = (action) => {
    setTimeout(() => {
      setLoading(action)
    }, 1500);
  }

  return (
    <>
      {
        loading && 
        <div className="loadingScreen">
          <img src="/BEI_logo.gif" alt="" />
        </div>
      }
      <div className='about'>
        <div className="about-banner" ref={bannerRef}>
          <video 
            ref={videoRef}
            src={videoSrc != "" ? videoSrc : '/'} 
            autoPlay             
            loop 
            muted={!mute}
            onLoadedData={() => handleLoadingScreen(false)}
          />
          <button onClick={()=>setMute(!mute)} className="mute_unmute">
            <img src="/mute.png" alt="icons" className={mute ? 'hide':''}/>
            <img src="/unmute.png" alt="icon" className={mute ? '':'hide'}/>
          </button>
        </div>
        
        <div className="about-grid-section">
          <div className="text-content">
            <h2>About Us</h2>
            <div  className="text-yellow">
              <RenderEmbeddedText embeddedText={about.description}/>
            </div>
          </div>
          <div className="image-content">
            <img src={about.right_image} alt="Our Journey" loading="lazy"/>
          </div>
        </div>

        {
          about.team_members?.map((item, index)=>(
          <div className={`team-member ${index%2 == 0 ? 'even':'odd'}`} key={index}>
            <div className="profile-section">
              <div className="profile-image">
                <img src={item.photo} alt={item.name}/>
              </div>
              <div className="social-icons">
                {item.website && <Link to={item.website} target="_blank"><SlGlobe /></Link>}
                {item.email && <Link to={'mailto:'+item.email} target="_blank"><HiOutlineMail /></Link>}
                {item.linkedin && <Link to={item.linkedin} target="_blank"><FaLinkedin /></Link>}
              </div>
            </div>
            <div className="bio-section">
              <div className="frame">
                <div className="paper"></div>
                <div className="paper"></div>
                <div className="paper"></div>
                <div className="paper">
                  <div className="bio-box">
                    <div className="border-design">
                      <p className={limitText != item.name ? "limit" : ''}>{item.description}</p>
                      <button onClick={()=>handleShowMoreBio(item.name)}>
                        {
                          limitText == item.name ? '...Show Less' : 'Show More'
                        }
                      </button>                                                                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))
        }

        <BrandSlider brand={brand}/>
      </div>
    </>
  )
}
