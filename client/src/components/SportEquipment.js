import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import Equipment from "./Equipment";



const SportEquipment = () => {
    const [equipment, setSportEquipment] = useState([]);
    
    useEffect (() => {
        const getSportEquipment = async () => {
        const response = await axios("http://localhost:5000/sports")
        
        console.log(response);
    
        setSportEquipment(response.data.sports)
        }
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