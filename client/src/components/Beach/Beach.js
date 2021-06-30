import React,{ useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Equipment from '../SportEquipment/Equipment'





const Beach = () => {
    const {beachId} = useParams();
    const [oneBeach, setBeach] = useState();
    const [date, setDate ] = useState();
    const [quantity, setQuantity] = useState();

    let history = useHistory();

    useEffect(() => {
        const getBeach = async () => {
            const response = await axios.get(`http://localhost:5000/beaches/find/${beachId}`)
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
                    <input type="number" name="quantity" id="quantity" min="0" max="10" step="2" value= {quantity} onChange= {(e) => setQuantity(e.target.value)}></input>
                    

                    {oneBeach.equipmentAvailable.map(equipment => {
                        return (
                            <div>
                            <Equipment key ={equipment._id} beachEquipment= {equipment.sportEquipment} stock= {equipment.stock}/>
                            { localStorage.getItem("w2_token") ?
                                <button type="button" class="btn btn-primary" onClick= {() => redirectToRent (equipment._id)} >Reservar</button>
                             :  <button type="button" class="btn btn-primary" onClick= {redirectToLogin}>Login</button>
                                 
                            }
                                
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