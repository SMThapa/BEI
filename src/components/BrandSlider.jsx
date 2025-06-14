import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay'; // only if needed
import { useState } from 'react';

export const BrandSlider = ({brand = []}) => {

    const [loadedImg, setLoadedImg] = useState([]);
    const handleLoadedImage = (img) => {
        setLoadedImg((prev) => [...prev, img]);
    };    

  return (
    <div className="logo-swiper-slider">
        <div className="logoContent">
            <h2>BEI BRANDS</h2>
        </div>          
        {
            brand.length == 0 ? "loading..." :
            <Swiper
                modules={[Autoplay]}
                loop={brand.length >= 6}
                autoplay={{
                delay: 0,                
                }}
                speed={3000}            
                spaceBetween={50}            
                breakpoints={{
                1024: { slidesPerView: 5 },                       
                0: { slidesPerView: 3 },
                }}            
            >
            {brand.map((img, index) => (
                <SwiperSlide key={index}>
                    <a href={`/work/brand/${img.brand_name?.split(" ").join("_")}`}>
                        <img
                            src={img.brand_logo}
                            className="swiper-lazy"
                            alt={index}                    
                            loading="lazy"       
                            onLoad={()=>handleLoadedImage(index)}                                    
                        /> 
                        <div className={`img-loader ${loadedImg.includes(index) ? 'hide-loader' : 'show-loader'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#0B62DA"></stop><stop offset=".3" stopColor="#0B62DA" stopOpacity=".9"></stop><stop offset=".6" stopColor="#0B62DA" stopOpacity=".6"></stop><stop offset=".8" stopColor="#0B62DA" stopOpacity=".3"></stop><stop offset="1" stopColor="#0B62DA" stopOpacity="0"></stop></radialGradient><circle transformOrigin="center" fill="none" stroke="url(#a9)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transformOrigin="center" fill="none" opacity=".2" stroke="#0B62DA" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>     
                        </div>                
                    </a>
                </SwiperSlide>
            ))}
            </Swiper>          
        }
    </div> 
  )
}
