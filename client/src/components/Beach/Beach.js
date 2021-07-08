import React,{ useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Equipment from '../SportEquipment/Equipment'
import { API_BASE_URL } from '../../constants/apiConstants';
import "../Beach/beach.css";


const Beach = () => {
    const {beachId} = useParams();
    const [oneBeach, setBeach] = useState();
    const [date, setDate ] = useState();
    const [quantity, setQuantity] = useState();

    let history = useHistory();

    const getBeach = async () => {
        const response = await axios.get(`${API_BASE_URL}/beaches/find/${beachId}`)
        setBeach(response.data.beach);
    };

    useEffect(() => {    
        getBeach();
    }, [beachId]);

    const redirectToLogin = () => {
        history.push("/users/login")
    }

    const redirectToRent = (equipmentId) => {
        

        // if(!beachId || !equipmentId || !date){
        //    return console.error(err.response.data)
        // }

        history.push(`/rent/newRental/${beachId}/${equipmentId}/${date}/${quantity}`)
    }

    const deleteEquipment= async (equipmentId) => {

        let opcion = window.confirm("¿Seguro que quieres eliminarlo?");

        if(opcion == true ){
          
          try {
            const token = localStorage.getItem("w2_token");
            const response = await axios.delete(`/beaches/removeEquipment/${equipmentId}`, {
            headers: {
              "Authorization": token
            }
    
            });
    
            console.log("Se ha eliminado correctamente")
            getBeach()
    
          } catch (err) {
            console.error(err.response.data);
          }
       
        } else {
          setTimeout(() => {
    
            console.log("Cancelando"); 
            history.push("/beaches");
    
          }, 1000);
          
        }
        
    }

    return (
        <div> 
            {oneBeach? 
                <div>
                    <div className="separador"> 
                        <p>Playa y Material</p>
                    </div>
                    <div className="playa">
                        <p >{oneBeach.name}</p>
                        {/* <p >{oneBeach.location}</p> */}
                        <img src= {oneBeach.file.url} alt="logo"/>
                    </div>
                    <div className="playa_info">
                        <p>Primero selecciona la fecha del alquiler para saber qué material está disponible</p>
                    </div>
                    
                    <div className="date">
                        <label>Fecha alquiler</label>
                        <input  type= "date" value= {date} onChange= {(e) => setDate(e.target.value)}></input>
                    </div>

                    {oneBeach.equipmentAvailable.map(equipment => {
                        return (
                            <div className="material_reserva" key ={equipment._id}>
                                
                                <Equipment  beachEquipment= {equipment.sportEquipment} stock= {equipment.stock} deleteEquipment={deleteEquipment}/>
                                <div className="reserva">
                                    { localStorage.getItem("w2_token") ?
                                        <button type="button" class="btn btn-primary" onClick= {() => redirectToRent (equipment.sportEquipment._id)} >Reservar</button>
                                    :  <button type="button" class="btn btn-primary" onClick= {redirectToLogin}>Login</button>
                                        
                                    }
                                    <input type="number" placeholder= "0" name="quantity" id="quantity" min="0" max="10" step="15" value= {quantity} onChange= {(e) => setQuantity(e.target.value)}></input>
                                    
                                </div>
                                <div className="line"></div>
                                
                            </div>
                        ) 
                    })}

                </div> : 
                <p>Loading</p>
            }             
        </div>  
    )
    
};

export default Beach;