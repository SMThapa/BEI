import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay'; // only if needed

export const BrandSlider = ({brand = []}) => {
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
                    />                  
                </a>
                </SwiperSlide>
            ))}
            </Swiper>          
        }
    </div> 
  )
}
