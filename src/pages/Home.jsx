import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";

export const Home = () => {

  const api = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState({});
  const [videoSrc, setVideoSrc] = useState('');
  const [mute, setMute] = useState(false);


  useEffect(()=>{
    async function getData(){
      try{
        const res = await axios.get(api+'/homecms');        
        setVideos(res.data.data)
        sessionStorage.setItem('homeBanner', JSON.stringify(res.data.data))
      }catch(err){
        console.log(err)
      }
    }
    
    const cacheData = sessionStorage.getItem('homeBanner')
    if(cacheData){
      setVideos(JSON.parse(cacheData))      
    }else{
      getData()
    }

  }, [])

  useEffect(()=>{
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const setVideo = () => {
      setVideoSrc(
        mediaQuery.matches
          ? "https://res.cloudinary.com/dpxcgs7nr/video/upload/v1752240134/home-mobile_yvfi7w.mp4"
          : "https://res.cloudinary.com/dpxcgs7nr/video/upload/v1752240134/home-desktop_tpimwe.mp4"
      );
    };

    setVideo()

    mediaQuery.addEventListener("change", setVideo);    
    return () => mediaQuery.removeEventListener("change", setVideo);

  }, [videos])
  

  const [loading, setLoading] = useState(true);
  const handleLoadingScreen = (action) => {
    setTimeout(() => {
      setLoading(action)
    }, 1000);
  }

  return (
    <>
      {
        loading && 
        <div className="loadingScreen">
          <img src="/BEI_logo.gif" alt="" />
        </div>
      }
      <div className="home">        
        <video 
          src={videoSrc != "" ? videoSrc : '/'} 
          autoPlay 
          muted={!mute}
          loop           
          playsInline
          onLoadedData={()=>handleLoadingScreen(false)}
        />
        <button onClick={()=>setMute(!mute)} className="mute_unmute">
          <img src="/mute.png" alt="icons" className={mute ? 'hide':''}/>
          <img src="/unmute.png" alt="icon" className={mute ? '':'hide'}/>
        </button>
      </div>
    </>

  )
}
