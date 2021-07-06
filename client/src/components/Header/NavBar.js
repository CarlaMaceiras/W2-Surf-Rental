import React from 'react';
import "./navbar.css";
import { Link } from 'react-router-dom';
import Logo from "../../images/logo2.png"




const NavBar = ({user}) => {
  

    return (
      <div>
       
          <nav className="header_navbar navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
              
              <div className= "header_logo">
                <a href="" className="logo"><img src={Logo} alt="logo"></img></a>
                <p>Surf Rental</p>
              </div>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                  <Link className="nav-link" to="/beaches">Playas</Link>
                  <Link className="nav-link" to="/sports">Material</Link>
                  <Link className="nav-link" to="/users/signup">Registrarse</Link>
                  <Link className="nav-link" to="/users/login">Entrar</Link>
                  <Link className="nav-link" to="/rent/myRent">Mis Reservas</Link> 
                  {user?.role === 1 ? <Link className="nav-link" to="/admin">Admin</Link> : ""}             
                </div>
              </div>
            </div>
          </nav>
        
      </div>
       
    );
};

export default NavBar;