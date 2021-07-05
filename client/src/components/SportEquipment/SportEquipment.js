import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import Equipment from "./Equipment";
import { useHistory } from "react-router-dom";
import { API_BASE_URL } from "../../constants/apiConstants";
import "./sportEquipment.css";



const SportEquipment = ({user}) => {
    const [equipment, setSportEquipment] = useState([]);

    let history = useHistory();
    
    useEffect (() => {
      
      const getSportEquipment = async () => {
        try {
          const token = localStorage.getItem("w2_token");
          const response = await axios.get(`${API_BASE_URL}/sports`, {
            headers: {
              "Authorization": token
            }
      
          });
          setSportEquipment(response.data.sports)
        }  
        catch (err) {
          console.error(err.response.data);
          if(err.response.status === 401){
            localStorage.removeItem("w2_token");
            history.pushState("/users/login")
          }
        }
      
      };
      getSportEquipment()
    
    }, []);


    return (
      <div className="all_equipment">

        {equipment.map(oneEquipment => {
          return (
          <div className="linea">
          <Equipment key={oneEquipment._id} beachEquipment={oneEquipment} user={user}/>
          </div>
          )
        })}
        
        
        

      </div>
    )
};

export default SportEquipment;