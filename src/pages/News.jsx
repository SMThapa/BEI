import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay , Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay'; // only if needed
import 'swiper/css/navigation';
import { TbSettingsQuestion } from "react-icons/tb";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";


export const News = () => {

    const api = import.meta.env.VITE_API_URL;
    const [news, setNews] =useState([])

    useEffect(()=>{
        async function getNew(){
            try{
                const res = await axios.get(api + '/news')        
                setNews(res.data.data)        
                
                sessionStorage.setItem("newsData", JSON.stringify(res.data.data))
            }catch(err){
                console.log(err)
            }finally{
                handleLoadingScreen(false)
            }
        }

        const cacheData = sessionStorage.getItem('newsData');
        if(cacheData){
            handleLoadingScreen(false)
            setNews(JSON.parse(cacheData))
        }else{
            getNew()
        }
        
    },[])

    const [loading, setLoading] = useState(true);
    const handleLoadingScreen = (action) => {
        setTimeout(() => {
        setLoading(action)
        }, 1000);
    }

    const slideRef = useRef(null);
    const handlePrevSlide = () => {
        if (slideRef.current) {
        slideRef.current.slidePrev();
        }
    };
    const handleNextSlide = () => {
        if (slideRef.current) {
        slideRef.current.slideNext();
        }
    };

  return (
    <>
        {
            loading && 
            <div className="loadingScreen">
            <img src="/BEI_logo.gif" alt="" />
            </div>
        }
        <div className="news">
            <img src="/news/news.png" alt="img" className="img1" />
            <img src="/news/tag.jpg" alt="img" className="img2" />
            <div className="news-slider">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    // navigation={true}
                    loop={news.length > 0}           
                    spaceBetween={50}                          
                    breakpoints={{
                        900: { slidesPerView: 2 },                       
                        0: { slidesPerView: 1 },
                    }}  
                    onSwiper={(swiper) => (slideRef.current = swiper)}
                >

                    {news.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link to={item.news_link} target="_blank">
                        <div className="news_title">{item.news_title}</div>
                        <img
                            src={item.thumbnail_picture}
                            className="swiper-lazy"
                            alt={index}                    
                            loading="lazy"                    
                        />                  
                        </Link>
                    </SwiperSlide>
                    ))}
                </Swiper>
                <>
                    <button type="button" onClick={handlePrevSlide} className="left"><FaChevronLeft /></button>
                    <button type="button" onClick={handleNextSlide} className="right"><FaChevronRight /></button>
                </>
            </div>

        </div>
    </>
  )
}
