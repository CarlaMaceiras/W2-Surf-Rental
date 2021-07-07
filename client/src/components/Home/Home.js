import "../Home/home.css";
import surf from "../../images/costa.jpg"
import sup from "../../images/sup2.jpg"
import kayak from "../../images/kayak.png"
import video from "../../images/Surfing.mp4"


const Home = () => {

    return (
        
        <div className="separacion">
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={surf} className="d-block w-100" alt="logo"/>
                    </div>
                    <div className="carousel-item">
                        <img src={sup} className="d-block w-100" alt="logo"/>
                    </div>
                    <div className="carousel-item">
                        <img src={kayak} className="d-block w-100" alt="logo"/>
                    </div>
                </div>
                {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span> 
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span> 
                </button> */}

                {/* <div class="youtube">

                    <video src={video} width="400"  autoplay muted loop></video>

                </div> */}
            </div>
        </div>

    )
    
}

export default Home;