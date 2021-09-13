import React from 'react';
import "./navbar.css";
import { Link } from 'react-router-dom';
import Logo from "../../images/logoTransparente.png"

const NavBar = ({user}) => {

  
  const closeNav = () => {

    let show= document.querySelector(".show");

    if(show){ 
      document.querySelector(".show").classList.remove("show")
    } 
     
  }


  return (
    <div className="main">

      {/* <div className="ordenador"> </div> */}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="header_logo logo" to="/"><img src={Logo} alt="logo"></img></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item" onClick={closeNav}>
                <Link className="nav-link"  aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item" onClick={closeNav}>
                <Link className="nav-link" to="/beaches">Playas</Link>
              </li>
              <li className="nav-item " onClick={closeNav}>
                <Link className="nav-link" to="/sports">Material</Link> 
              </li>
              {/* <li className="nav-item " onClick={closeNav}>
                <Link className="nav-link" to="/users/signup">Registrarse</Link> 
              </li> */}
              <li className="nav-item " onClick={closeNav}>
                <Link className="nav-link" to="/users/login"><i class="fas fa-sign-in-alt"></i></Link> 
              </li>
              <li className="nav-item " onClick={closeNav}>
                <Link className="nav-link" to="/users/login/oneUser"><i class="far fa-user"></i></Link> 
              </li>
              {/* <li className="nav-item " onClick={closeNav}>
                <Link className="nav-link" to="/rent/myRent">Mis Reservas</Link> 
              </li> */}
              {user?.role === 1 ? <li className="nav-item " onClick={closeNav}><Link className="nav-link" to="/admin">Admin</Link></li> : ""}
            </ul>
          </div>
        </div>
      </nav>
      
        {/* <nav className="header_navbar navbar navbar-expand-lg navbar-dark " >
          <div className="container-fluid">
            
            <div className= "header_logo">
              <a href="" className="logo"><img src={Logo} alt="logo"></img></a>
              <p></p>
            </div>
            <button 
              className={"navbar-toggler collapsed" + expanded} 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNavAltMarkup" 
              aria-controls="navbarNavAltMarkup" 
              aria-expanded="false" 
              aria-label="Toggle navigation">
              onClick={() => setExpanded(expanded ? "" : "expanded")}

              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse"  id="navbarNavAltMarkup">
              <div className="navbar-nav" >
                <Link className="nav-link"  aria-current="page" to="/">Home</Link>
                <Link className="nav-link" onClick={() => setExpanded(false)} to="/beaches">Playas</Link>
                <Link className="nav-link" to="/sports">Material</Link>
                <Link className="nav-link" to="/users/signup">Registrarse</Link>
                <Link className="nav-link" to="/users/login">Entrar</Link>
                <Link className="nav-link" to="/users/login/oneUser">Mi Perfil </Link> 
                <Link className="nav-link" to="/rent/myRent">Mis Reservas</Link> 
                {user?.role === 1 ? <Link className="nav-link" to="/admin">Admin</Link> : ""}             
              </div>
            </div>
          </div>
        </nav> */}
      
    </div>
      
  );
};

export default NavBar;