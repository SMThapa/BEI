import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const useTitle = ({title}) => {

    const {pathname} = useLocation()
    useEffect(()=>{
        window.title = title
    },[pathname])

  return null;
}
