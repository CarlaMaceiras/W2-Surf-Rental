import React,{ useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const NewRental = () => {
    const { beachId, equipmentId, date, quantity } = useParams();
    const body = {
        equipmentId: `${equipmentId}`,
        date: `${date}`,
        quantity: `${quantity}`
        
    }
    
    const [rent, setRent] = useState();


    let history = useHistory();

    useEffect( () => {
        const getRent = async () => {
            try {
                const token = localStorage.getItem("w2_token");
                const response = await axios.post(`http://localhost:5000/rent/newRental/${beachId}`, body, 
                
                {
                    headers: {
                        "Authorization": token
                    }
                })
                console.log(response)
                setRent(response.data)
                
            }
            catch (err) {
                console.error(err.response.data);
                if(err.response.status === 401){
                  localStorage.removeItem("w2_token");
                  history.push("/users/login")
                }
            }
            
        };
        getRent();
        
    }, []);

    return (
        <div>
            <img />
        </div>
    )
}


export default NewRental;