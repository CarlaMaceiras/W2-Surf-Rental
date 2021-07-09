import React from 'react';
import "./footer.css";


const Footer = () => {

    return(
        <div>
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