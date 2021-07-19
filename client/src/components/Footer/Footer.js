import React from 'react';
import "./footer.css";
import olaian from "../../images/sponsores/olaian.png"
import concello1 from "../../images/sponsores/oleiros.png"
import concello2 from "../../images/sponsores/ferrol.jpg"
import fede from "../../images/sponsores/federaciongalega.png"
import fire from "../../images/sponsores/firewire.png"
import pukas from "../../images/sponsores/Pukas.png"


const Footer = () => {

    return(
        <div>
            <div className="sponsor">
                <div className="sp">
                    <img src={fede} alt="sponsor"></img>
                    <img src={fire} alt="sponsor"></img>
                    <img src={pukas} alt="sponsor"></img>
                </div>
                <div className="sp">
                    <img src={olaian} alt="sponsor"></img>
                    <img src={concello1} alt="sponsor"></img>
                    <img src={concello2} alt="sponsor"></img>
                </div>
                
            </div>
            <footer id="footer" className="text-center text-white">
        
                <div className="container p-4 pb-0">
                
                    <section className="mb-4">
                        
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                            <i className="fab fa-facebook"></i>
                        </a>

                        
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i
                                className="fab fa-twitter"></i></a>

                    
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i
                                className="fab fa-google"></i></a>

                        
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i
                                className="fab fa-instagram"></i></a>

                    
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i
                                className="fab fa-linkedin-in"></i></a>

                        
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i
                                className="fab fa-github"></i></a>
                    </section>
                    
                </div>
                
                <div class="bg-light text-center text-lg-start">
                <div class="text-center p-3">
                    © 2020 Copyright:
                    <a class="text-ligth" href="">w2-surfRental.com</a>
                </div>
                </div>
                
                
            </footer>
    
        </div>
    )
}

export default Footer;