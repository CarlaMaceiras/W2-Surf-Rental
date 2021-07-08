import React,{ useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from '../../constants/apiConstants';
import "../Rental/myRent.css";


const MyRent = () => {
    const [myRent, setRent] = useState([]);

    let history = useHistory();

    const getRent = async () => {
        try {
            const token = localStorage.getItem("w2_token");
            const response = await axios.get(`${API_BASE_URL}/rent//myRental`,
            {
                headers: {
                  "Authorization": token
                }
          
              });
              console.log(response);
              setRent(response.data.myRental)
            
        } catch (err) {
            console.error(err.response.data);
        if(err.response.status === 401){
            
            history.pushState("/users/login")
        }
        }
    };

    useEffect (() => {
        
        getRent()
    }, []);

    const deleteReserve = async (reserveId) => {

        let opcion = window.confirm("¿Seguro que quieres eliminarla?");

        if(opcion == true ){
          
          try {
            const token = localStorage.getItem("w2_token");
            const response = await axios.delete(`/rent/deleteMyRental/${reserveId}`, {
            headers: {
              "Authorization": token
            }
    
            });
    
            console.log("Se ha eliminado correctamente")
            getRent()
    
          } catch (err) {
            console.error(err.response.data);
          }
       
        } else {
          setTimeout(() => {
    
            console.log("Cancelando"); 
            history.push("/");
    
          }, 1000);
          
        }  
    }

    const formatDate= (date)=>{

        let newDate = new Date(date);

        return(
 
            `${newDate.getDate().toString().length === 1? "0" + newDate.getDate() : newDate.getDate()}-${newDate.getMonth().toString().length === 1? "0" + newDate.getMonth() : newDate.getMonth()}-${newDate.getFullYear()}`
            
        )
    }

    return (

        <div>

            <div className="separador"> 
                <p>Mis Reservas</p>
            </div>

            <div className="info_completa">
                
                <div className="subinfo_completa">
                    {myRent.map(oneRent => {
                        
                        return (
                            
                            <div key ={oneRent._id} className="one_info"> 
                                <div className="delete_button">
                                    <button type="button" className="boton_delete btn-close" aria-label="Close" onClick={() => deleteReserve (oneRent._id)}></button>
                                </div>
                                <img src= {oneRent.sportEquipment.file.url} alt="logo"/>
                                
                                <div className="info_total">
                                    <p>{oneRent.beach.name}</p>
                                
                                    <p>{oneRent.sportEquipment.model}</p>
                                    
                                    <p>{oneRent.sportEquipment.level}</p>
                                </div>

                                <div className="quantity_date_total">
                                    <p>{oneRent.quantity}</p>
                                    <p>{formatDate(oneRent.date)}</p>
                                </div>
                            </div>         
                        );
                    })}
                </div>
                
            </div>

        </div>


    )



}

export default MyRent;