import React from 'react';
import "./navbar.css";
import logo from "../Header/logo_sin_fondo.jpg"



const NavBar = (props) => {
  

    return (
      <div>

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <div className="menu_logo"></div>
            {/* <a href="" className="header_logo"><img src={logo} alt="logo"></img></a> */}
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                  <a className="nav-link" href="/beaches">Playas</a>
                  <a className="nav-link" href="/sports">Material</a>
                  <a className="nav-link" href="/users/signup">Registrarse</a>
                  <a className="nav-link" href="/users/login">Entrar</a>
                  <a className="nav-link" href="/rent/myRent">Mis Reservas</a>              
                </div>
              </div>
            </div>
          </nav>
        
      </div>
       
    );
};

export default NavBar;