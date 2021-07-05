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

    useEffect(() => {
        const getBeach = async () => {
            const response = await axios.get(`${API_BASE_URL}/beaches/find/${beachId}`)
            setBeach(response.data.beach);
        };
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

    return (
        <div> 
            {oneBeach? 
                <div>
                    <div className="separador"> 
                        <p>Material</p>
                    </div>
                    <div className="playa">
                        <p >{oneBeach.name}</p>
                        {/* <p >{oneBeach.location}</p> */}
                        <img src= {oneBeach.file.url} alt="logo"/>
                    </div>
                    
                    <div className="date">
                        <label>Selecciona la fecha</label>
                        <input  type= "date" value= {date} onChange= {(e) => setDate(e.target.value)}></input>
                    </div>

                    {oneBeach.equipmentAvailable.map(equipment => {
                        return (
                            <div className="material_reserva" key ={equipment._id}>
                                
                                <Equipment  beachEquipment= {equipment.sportEquipment} stock= {equipment.stock}/>
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