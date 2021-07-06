import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import Equipment from "./Equipment";
import { useHistory, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constants/apiConstants";
import "./sportEquipment.css";



const SportEquipment = ({user}) => {
  const [equipment, setSportEquipment] = useState([]);

  let history = useHistory();

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
        history.push("/users/login")
      }
    }
  
  };
  
  useEffect (() => {
    
    getSportEquipment()
  
  
  }, []);


  const deleteEquipment= async (equipmentId)=>{
    
    let opcion = window.confirm("¿Seguro que quieres eliminarlo?");

    if(opcion == true ){
      
      try {
        const token = localStorage.getItem("w2_token");
        const response = await axios.delete(`${API_BASE_URL}/sports/deleteEquipment/${equipmentId}`, {
        headers: {
          "Authorization": token
        }

        });

        console.log("Se ha eliminado correctamente")
        getSportEquipment()

      } catch (err) {
        console.error(err.response.data);
      }
   
    } else {
      setTimeout(() => {

        console.log("Cancelando"); 
        history.push("/sports");

      }, 1000);
      
    }
    

    
  };
    

  return (
    <div className="all_equipment">

      {equipment.map(oneEquipment => {
        return (
        <div className="linea">
        <Equipment key={oneEquipment._id} beachEquipment={oneEquipment} user={user} deleteEquipment={deleteEquipment}/>
        </div>
        )
      })}
      
      
      

    </div>
  )
};

export default SportEquipment;