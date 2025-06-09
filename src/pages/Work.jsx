import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Work = () => {

  const [activeLogo, setActiveLogo] = useState('');  
  const logoPosition = {
    0: "position1",
    1: "position2",
    2: "position3"
  }
  const api = import.meta.env.VITE_API_URL;

  const [brandList, setBrandList] = useState([])
  useEffect(()=>{
    async function callAPI(){
      try{
        const res = await axios.get(api + '/allbrands');
        let newArr = res.data.data?.sort((a,b) => a.id - b.id)
        let arrWithPosition = newArr.map((obj, index)=>({
          ...obj,
          position: index % 3
          }))
        setBrandList(arrWithPosition)

        sessionStorage.setItem('allBrands', JSON.stringify(arrWithPosition))        
      }catch(err){
        console.log(err)
      }finally{
        handleLoadingScreen(false)
      }
    }

    const cachedData = sessionStorage.getItem('allBrands')        
    if(cachedData){
      setBrandList(JSON.parse(cachedData))            
      handleLoadingScreen(false)
    }else{
      callAPI()
    }
  }, [])

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
      <div className="work">
        <div className="logo">
          {
            brandList.map((brand, index)=>(
              <img src={brand.brand_logo} alt={brand.name} key={index} className={` ${activeLogo == brand.brand_name ? 'active-logo': ''} ${logoPosition[brand.position]}`}/>
            ))
          }
        </div>
        <ul className="brands">
          {
            brandList.map((brand, index)=>(
              <li key={index} onMouseEnter={()=>setActiveLogo(brand.brand_name)} onMouseLeave={()=> setActiveLogo(' ')}>
                <Link to={'/work/brand/'+ brand.brand_name.split(" ").join("_")}>{brand.brand_name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}
