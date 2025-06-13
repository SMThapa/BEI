import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FiArrowUpRight } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';

export const Header = () => {

  const api = import.meta.env.VITE_API_URL;
  const [openMenu, setOpenMenu] = useState(false);
  const [brandList, setBarndList] = useState([])
  const [openBrands, setOpenBrands] = useState(false)

  const {pathname} = useLocation()  
  useEffect(()=>{
    if(pathname == '/'){
      setOpenMenu(true)
    }else{
      setOpenMenu(false)
    }

    window.scrollTo(0,0)
  }, [pathname])

  useEffect(()=>{
    if(openMenu){
      document.documentElement.style.overflow = 'hidden';
    }else{
      document.documentElement.style.overflow = '';
      setOpenBrands(false)
    }
  }, [openMenu])

  useEffect(()=>{
    async function callAPI(){
      try{
        const res = await axios.get(api + '/allbrands');
        let newArr = res.data.data?.sort((a,b) => a.id - b.id)
        let arrWithPosition = newArr.map((obj, index)=>({
          ...obj,
          position: index % 3
        }))
        setBarndList(arrWithPosition)        
        sessionStorage.setItem('allBrands', JSON.stringify(arrWithPosition))  
      }catch(err){
        console.log(err)
      }
    }

    const cacheData = sessionStorage.getItem('allBrands');    
    if(cacheData){
      setBarndList(JSON.parse(cacheData))      
    }else{
      callAPI()
    }
      
  }, [])  

  return (
    <nav>
      <div className={`header ${pathname.includes('work/brand') ? '': 'nav-visible'}`}>
        <div className="logo">
          <Link to={'/'}>
            <img src="/logo.png" alt="logo" />
          </Link>
        </div>
      </div>
      <div className={`backdrop ${openMenu ? 'activate': ""}`} ></div>
      <button className="hamburger" onClick={()=>setOpenMenu(!openMenu)}> 
        <svg className={`hm-button ${openMenu ? 'open' : ''}`} role="button" width="35" height="35" viewBox="0 0 50 50">
          <rect className="hm-outline" />
          <path className="hm-line1" />
          <path className="hm-line2" />
          <path className="hm-line3" />
        </svg>
      </button>
      <div className={`navBar ${openMenu ? 'open-navBar' : ''}`}>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/about-us'}>About Us</NavLink>
        <NavLink to={'/work'} className='work-desktop'>work</NavLink>
        <p className='work-mobile' onClick={()=>setOpenBrands(true)}>Work <FiArrowUpRight /></p>
        <NavLink to={'/services'}>services</NavLink>
        <NavLink to={'/in-news'}>in news</NavLink>
        <NavLink to={'/contact'}>contact</NavLink>

        <div className={`brands ${openBrands ? 'brands-open': ''}`}>
          <div className="title">Brands <span onClick={()=>setOpenBrands(false)}><FaArrowLeft /></span></div>
          <hr />
          <div className="brand-list">
            {
              brandList.map((brand, index)=>(
                <Link to={'/work/brand/'+ brand.brand_name.split(" ").join("_")} key={index}>{brand.brand_name}</Link>
              ))
            }  
          </div>          
        </div>

      </div>

    </nav>
  )
}
