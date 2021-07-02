import React,{ useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from '../../constants/apiConstants';

const NewRental = () => {
    const { beachId, equipmentId, date, quantity } = useParams();
    
    const [cantidad, setCantidad] = useState(`${quantity}`);
    
    
    const [rent, setRent] = useState([]);

    useEffect (() => {
      
        const getRent = async () => {
          try {
            const token = localStorage.getItem("w2_token");
            const response = await axios.get(`${API_BASE_URL}/sports/oneEquipment/${equipmentId}`, {
              headers: {
                "Authorization": token
              }
        
            });
            console.log(response)
            setRent(response.data.material)
          }  
          catch (err) {
            console.error(err.response.data);
            if(err.response.status === 401){
              localStorage.removeItem("w2_token");
              history.pushState("/users/login")
            }
          }
        
        };
        getRent()
      
      }, []);


    let history = useHistory();

   

    const confirmationRent = async () => {
        
        const body = {
        equipmentId,
        date,
        quantity: cantidad   
        }

      
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
            history.push("/rent/myRent")
            
        }
        catch (err) {
            console.error(err.response.data);
            if(err.response.status === 401){
                localStorage.removeItem("w2_token");
                history.push("/users/login")
            }
        }
            
      

    }

    return (
        <div>
            <div className="info_box">
                <div className="subinfo_box">
                    
                    <img src={rent.file?.url} alt="logo"/>
                    

                    <div className="info_equipment">
                        <div>
                            <p>{rent.model}</p>
                        </div>
                        <div>
                            <p>{rent.size}</p>
                        </div>
                        <div>
                            <p>{rent.level}</p>
                        </div>

                    </div>

                    <div className="quantity_date">
                        <input type="number" placeholder= "0" name="quantity" id="quantity" min="0" max="10" step="15" value= {cantidad} onChange= {(e) => setCantidad(e.target.value)}></input>
                        <p>{date}</p>
                    </div>
                </div> 
            </div>

            <button type="button" className="btn btn-primary"  onClick= {confirmationRent}>Reservar</button>

        </div>
    )
}


export default NewRental;