import { useEffect, useState, useRef } from "react"
import { useLocation, useParams } from "react-router-dom"
import { ImageGallery } from "../components/ImageGallery";
import {BrandSlider} from '../components/BrandSlider';
import {RenderEmbeddedText} from '../components/RenderEmbeddedText';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

export const SingleBrand = () => {

  const [theBrand, setTheBrand] = useState({})
  const [abrand, setBrand] = useState([])
  const {brand} = useParams()
  useEffect(()=>{        
    async function getBrand(){    
      try{
        const res = await axios.get(api + '/allbrands')
        setTheBrand(res.data.data.find(obj => obj.brand_name == brand.split('_').join(' ')))                 
        setBrand(res.data.data)
      }catch(err){
        console.log(err)
      }
    }

    const cashedData = sessionStorage.getItem('allBrands')
    if(cashedData){
      setBrand(JSON.parse(cashedData))
      setTheBrand(JSON.parse(cashedData).find(obj => obj.brand_name == brand.split('_').join(' ')))      
    }else{
      getBrand()
    }
  }, [brand])

  const [selectedVideo, setSelectedVideo] = useState(null);
  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open    
  };
  const closeModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "auto"; // Restore scrolling
  }; 


  const videoRef = useRef(null);
  const handlePrevVideo = () => {
    if (videoRef.current) {
      videoRef.current.slidePrev();
    }
  };
  const handleNextVideo = () => {
    if (videoRef.current) {
      videoRef.current.slideNext();
    }
  };

  const [loading, setLoading] = useState(true);
  const handleLoadingScreen = (action) => {
    setTimeout(() => {
      setLoading(action)
    }, 1500);
  }

  const {pathname} = useLocation()
  useEffect(()=>{
    setLoading(true)        
  }, [pathname])

  return (
    <>
      {
        loading && 
        <div className="loadingScreen">
          <img src="/BEI_logo.gif" alt="" />
        </div>
      }
      <div className="single-brand">
        <div className="brand-banner">
          <Swiper
            modules={[Pagination ,Autoplay]}
            loop={theBrand?.banner_images?.length > 1}        
            pagination={{ clickable: true }}    
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            speed={3000}            
            spaceBetween={0}            
          >
            {            
              theBrand.banner_images?.map((img, index)=>(
                <SwiperSlide key={index}>
                  <img src={img} alt="banner-image" decoding="async" fetchPriority="high" loading="lazy" onLoad={()=>handleLoadingScreen(false)}/>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div> 

        <div className="brand-video-slider">
          <Swiper        
            loop={theBrand?.youtube_link?.length >= 1}
            spaceBetween={10}
            slidesPerView={1}        
            onSwiper={(swiper) => (videoRef.current = swiper)}
          >
            {
              theBrand?.youtube_link?.map((video, index) => (
                <SwiperSlide>
                  <iframe
                    src={video && video}
                    title={`YouTube video ${index + 1}`}  
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>              
                </SwiperSlide>
              ))
            }
          </Swiper>
          {theBrand?.youtube_link?.length > 1 && 
            <>
              <button type="button" onClick={handlePrevVideo} className="left"><FaChevronLeft /></button>
              <button type="button" onClick={handleNextVideo} className="right"><FaChevronRight /></button>
            </>
          }
          
        </div>

        <div className="brand-description">        
          <RenderEmbeddedText embeddedText={theBrand.below_video_text}/>
        </div>
        {
          theBrand.image_gallery?.length > 0 ? 
          <ImageGallery images={theBrand ? theBrand?.image_gallery : []}/>
          : ""
        }    
        {
          theBrand.video_gallery_video?.length > 0 ?
          <div className="brand-video-gallery">
            <div className="content">
              <h2 className="video-gallery-video-title">VIDEO GALLERY</h2>
              <div className="video-gallery">
                {theBrand.video_gallery_video?.map((video, index) => (
                  <div key={index} className="gallery-item" onClick={() => openModal(video.video_input)} style={{padding: video.thumbnail_picture ? '': '15px'}}>
                    <img src={video.thumbnail_picture || theBrand.brand_logo} alt={index + 'image'} className="gallery-image" />
                    <div className="gallery-item-caption">
                      <h2>{video.title || theBrand.brand_name}</h2>              
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal */}
              {selectedVideo && (
                <div className="video-modal">
                  <div className="modal-content">
                    <button className="close-button" onClick={closeModal}>&times;</button>
                    <div className="player-wrapper">
                      {/* <ReactPlayer url={selectedVideo} width="100%" height="100%" controls playing /> */}
                      <video src={selectedVideo} controls height="100%" width="100%"></video>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div> : ''
        }
        <BrandSlider brand={abrand}/>
      </div>
    </>
  )
}
