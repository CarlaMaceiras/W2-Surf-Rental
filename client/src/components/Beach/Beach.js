import React,{ useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Equipment from '../SportEquipment/Equipment'




const Beach = () => {
    const {beachId} = useParams();
    const [oneBeach, setBeach] = useState();

    useEffect(() => {
        const getBeach = async () => {
            const response = await axios.get(`http://localhost:5000/beaches/find/${beachId}`)
            setBeach(response.data.beach);
        };
        getBeach();
    }, [beachId]);

    return (
        <div> 

            {oneBeach? 
                <div>
                    <p >{oneBeach.name}</p>
                    <p >{oneBeach.location}</p>
                    {/* <p >{oneBeach.file.public_id}</p> */}
                    {oneBeach.equipmentAvailable.map(equipment => {
                        return <Equipment key ={equipment._id} beachEquipment= {equipment.sportEquipment} stock= {equipment.stock}/>
                    })}
                    
                </div> : 
                <p>Loading</p>
            }             
        </div>  
    )
    
};

export default Beach;