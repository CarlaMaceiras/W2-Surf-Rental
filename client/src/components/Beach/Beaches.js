import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../constants/apiConstants";
import imagenMapa from "../Beach/mapa.JPG";
import "./beaches.css";



const Beaches = () => {

    const [beaches, setBeaches] = useState([]);       //Me guarda las playas que encuentra. Metemos la info dentro de un state (beaches) con setBeaches

    useEffect (() => {
        const getBeaches = async () => {
        const response = await axios.get(`${API_BASE_URL}/beaches`)
        
        console.log(response);
    
        setBeaches(response.data.beaches)
        }
        getBeaches()
    
    }, []);

    return (
        <div>
          <div className="separador"> 
            <p>Playas</p>
          </div>

          <div className="cabecera"> 
            <p>¿En dónde estamos?</p>
          </div>

          <div className="map">
          {/* <iframe src="https://www.google.com/maps/embed?pb=!1m40!1m12!1m3!1d185611.56909161847!2d-8.51701003969206!3d43.37324418000871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m25!3e0!4m5!1s0xd2dd7e6dfbff2fd%3A0x7592293b12632eb1!2sPlaya%20es%20Doni%C3%B1os!3m2!1d43.498031399999995!2d-8.318768!4m5!1s0xd2e7b3ae50094fd%3A0x38617060795cb291!2sPlaya%20de%20Bastiagueiro%2C%20La%20Coru%C3%B1a!3m2!1d43.340872399999995!2d-8.364640399999999!4m5!1s0xd2e7c7c8dd7279d%3A0x2085710f5abb8261!2sPlaya%20del%20Orz%C3%A1n!3m2!1d43.3716394!2d-8.404544999999999!4m5!1s0xd2e8587322bbe11%3A0x629daa4fce438a5a!2sPlaya%20de%20Cai%C3%B3n%2C%20A%20Coru%C3%B1a%2C%20Laracha!3m2!1d43.314949!2d-8.6102426!5e0!3m2!1ses!2ses!4v1625481698981!5m2!1ses!2ses" width="400" height="300"  allowfullscreen="" loading="lazy"></iframe> */}
          <img src={imagenMapa} alt="mapa"/>
          </div>
    
          {beaches.map(beach => {
            return (
              
              <Link  key={beach._id} to={`/beaches/${beach._id}`}> 
                <div className="playas">
                  <p>{beach.name}</p>
                  <img src= {beach.file.url} alt="logo"/>
                  
                  <button type="button" class="btn btn-success">Seleccionar</button>
                </div>
              </Link>            
            )
          })}
          
        </div>
      );

    
};

export default Beaches;