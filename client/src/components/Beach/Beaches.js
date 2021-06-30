import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";



const Beaches = () => {

    const [beaches, setBeaches] = useState([]);       //Me guarda las playas que encuentra. Metemos la info dentro de un state (beaches) con setBeaches

    useEffect (() => {
        const getBeaches = async () => {
        const response = await axios.get("http://localhost:5000/beaches")
        
        console.log(response);
    
        setBeaches(response.data.beaches)
        }
        getBeaches()
    
    }, []);

    return (
        <div className="App">
    
          {beaches.map(beach => {
            return (
              
              <Link key={beach._id} to={`/beaches/${beach._id}`}> 
              <p>{beach.name}</p>
              <img src= {beach.file.url} alt="logo"/>
              <button color="secondary" size="lg" block>Seleccionar</button>
              </Link>            
            )
          })}
          
        </div>
      );

    
};

export default Beaches;