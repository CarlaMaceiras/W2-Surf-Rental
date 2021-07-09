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
        const response = await axios.get("/api/beaches")
        
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
            <p className="info">Disponemos de cuatro puntos de alquiler de material. 
              Estamos esperándote en las playas de Caion, Orzan, Bastiagueiro y Doniños. </p>
          </div>

          <div className="map">
          <iframe src="https://www.google.com/maps/d/embed?mid=1VToVKiur3UsCndfpjMFSMNsOT2dtefXD" width="350" height="300"></iframe>
          </div>

          <div className="selecciona"> 
            <p>En cada playa tenemos diferente material por lo que deberás entrar primero en una playa y
              podrás ver qué te podemos ofrecer
            </p>
          </div>
    
          {beaches.map(beach => {
            return (
              
              <Link  key={beach._id} to={`/beaches/${beach._id}`}> 
                <div className="playas">
                  <p>{beach.name}</p>
                  <img src= {beach.file.url} alt="logo"/> 
                </div>
              </Link>            
            )
          })}
          
        </div>
      );

    
};

export default Beaches;