import { useEffect, useState } from "react";
import axios from "axios";

export const Test = () => {
    const api = import.meta.env.VITE_API_URL;
    const [theData, setTheData] = useState([])

    useEffect(()=>{
        async function getData(){
            try{
                const res = await axios.get(api+'/allbrands');
                console.log(res.data.data)        
                setTheData(res.data.data)
            }catch(err){
                console.log(err)
            }
        }
        getData()
    }, [])

  return (
    <div>
        <div style={{height:'100vh'}}></div>
        {
            theData.map((item, index)=>(
                <div className="container" key={index}>
                    <img src={item.brand_logo} alt="" height={'200px'}/>                    
                    {item.brand_name}
                </div>
            ))
        }
    </div>
  )
}
