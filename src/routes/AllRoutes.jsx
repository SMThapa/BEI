import { Route, Routes } from "react-router-dom";
import { Contact, News, Services, SingleBrand, Work, About, Home, Test } from "../pages/index";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/test" element={<Test/>}/>
      <Route path="/about-us" element={<About/>}/>
      <Route path="/work" element={<Work/>}/>
      <Route path="/work/brand/:brand" element={<SingleBrand/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/in-news" element={<News/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
  )
}
