import React,{ useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Equipment from '../SportEquipment/Equipment'
import { API_BASE_URL } from '../../constants/apiConstants';


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
                    <p >{oneBeach.name}</p>
                    <p >{oneBeach.location}</p>
                    <img src= {oneBeach.file.url} alt="logo"/>
                    <input type= "date" value= {date} onChange= {(e) => setDate(e.target.value)}></input>
                    
                    

                    {oneBeach.equipmentAvailable.map(equipment => {
                        return (
                            <div key ={equipment._id}>
                            <Equipment  beachEquipment= {equipment.sportEquipment} stock= {equipment.stock}/>
                            { localStorage.getItem("w2_token") ?
                                <button type="button" class="btn btn-primary" onClick= {() => redirectToRent (equipment.sportEquipment._id)} >Reservar</button>
                             :  <button type="button" class="btn btn-primary" onClick= {redirectToLogin}>Login</button>
                                 
                            }
                            <input type="number" placeholder= "0" name="quantity" id="quantity" min="0" max="10" step="15" value= {quantity} onChange= {(e) => setQuantity(e.target.value)}></input>
                                
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