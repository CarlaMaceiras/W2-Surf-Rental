import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import { API_BASE_URL } from "../../constants/apiConstants";

const Admin = () => {

    

    const newEquipment= async () => {

        const [newEquipment, setNewEquipment] = useState([]);

        useEffect( () => {
            const getNewEquipment = async () => {
            
                try {
                    const token = localStorage.getItem("w2_token");
                    const response = await axios.get(`${API_BASE_URL}/sports`, {
                
                        headers: {
                            "Authorization": token
                        }
                    })
                    setNewEquipment(response.data.sports)
                }
                catch (err) {
                    console.error(err.response.data);
                    if(err.response.status === 401){
                    localStorage.removeItem("w2_token");
                    history.pushState("/users/login")
                    }
                }
            }
            getNewEquipment()

        }, []);
        
    
        
            
    }

    return (
        <div>
            <button type="button" class="btn btn-primary" onClick={newEquipment}>Crear nuevo material</button>
        </div>
    )
}