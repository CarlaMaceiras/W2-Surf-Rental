import React from 'react';

const NavBar = (props) => {
  

    return (
      <div>

          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">W² Surf Rental</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <a class="nav-link active" aria-current="page" href="/">Home</a>
                  <a class="nav-link" href="/beaches">Playas</a>
                  <a class="nav-link" href="/sports">Material</a>
                  <a class="nav-link" href="/users/signup">Registrarse</a>
                  <a class="nav-link" href="/users/login">Entrar</a>             
                </div>
              </div>
            </div>
          </nav>
        
      </div>
       
    );
};

export default NavBar;