import "../Home/home.css";
import surf from "../../images/surf2.jpg"
import sup from "../../images/sup.png"
import feel from "../../images/feel.jpg"


const Home = (props) => {
    

    return (
        
        <div className="separacion">

            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={surf} class="d-block w-100" alt="logo"/>
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Surfea</h5>
                            <p>Se uno con el mar</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={sup} class="d-block w-100" alt="logo"/>
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Navega</h5>
                            <p>Respira hondo y disfruta</p>
                         </div>
                    </div>
                     <div class="carousel-item">
                        <img src={feel} class="d-block w-100" alt="..."/>
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Siente</h5>
                            <p>Nota el aire en tu piel</p>
                        </div>
                    </div> 
                </div>
                {/* <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button> 
                </div>*/}

                {/* <div class="youtube">

                    <video src={video} width="400"  autoplay muted loop></video>

                </div> */}
            </div> 
            

           
        </div>

    )
    
}

export default Home;