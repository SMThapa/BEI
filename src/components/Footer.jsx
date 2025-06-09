import { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaDribbble, FaLinkedin } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

export const Footer = () => {

    const {pathname} = useLocation();
    const [show, setShow] = useState(true)
    useEffect(()=>{
        if(pathname == '/'){
            setShow(false)
        }else{
            setShow(true)
        }
    }, [pathname])

  return (
    <footer className={`site-footer ${show ? '':'hide'}`}>
        <div className="container">
            <div className="grid">
                <div className="col ">
                    <h6>About</h6>
                    <p className="text-justify">
                    BEI is a full-service integrated independent advertising agency with over 26 years of experience in building brands.
                    From crafting cutting-edge brand strategies, executing captivating creative campaigns, and making the most of digital marketing expertise, BEI Confluence is your one-stop destination for all things advertising.
                    </p>
                </div>
                <div className="col">
                    <h6>Quick Links</h6>
                    <ul className="footer-links">
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/work">Work</Link></li>
                    <li><Link to="/contact">Contact</Link></li>

                    </ul>
                </div>
                <div className="col">
                    <h6>Contact Information</h6>
                    <address>
                        7th Floor, Unit Number - 701, 702, 703 & 704
                        Tower B, Phase 1, Sector 37, Faridabad
                        121003 Haryana
                        India
                        <br/>
                                +91-0129-6922000
                        <br/>

                        infoconfluence@confluencecommunication.com
                    </address>
                </div>
            </div>            
            <hr />
        </div>        

        <div className="container">
            <div className="flex">
            <div className="col">
                <p className="copyright-text">
                &copy; 2025 All Rights Reserved by <Link to="#">BEI Confluence</Link>.
                </p>
            </div>

            <div className="col">
                <ul className="social-icons">
                    <li><a className="facebook" href="#"><FaFacebook /></a></li>
                    <li><a className="twitter" href="#"><FaTwitter /></a></li>
                    <li><a className="dribbble" href="#"><FaDribbble /></a></li>
                    <li><a className="linkedin" href="#"><FaLinkedin /></a></li>
                </ul>
            </div>
            </div>
        </div>
    </footer>
  )
}
