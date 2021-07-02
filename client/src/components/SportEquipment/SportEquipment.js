import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import Equipment from "./Equipment";
import { useHistory } from "react-router-dom";
import { API_BASE_URL } from "../../constants/apiConstants";



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
        <div className="App">
    
          {equipment.map(oneEquipment => {
            return (
            <Equipment key={oneEquipment._id} beachEquipment={oneEquipment} />
            )
          })}

        </div>
    )
};

export default SportEquipment;