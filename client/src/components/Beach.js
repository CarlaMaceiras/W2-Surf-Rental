import React,{ useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";


const Beach = () => {
    const {beachId} = useParams();
    const [oneBeach, setBeach] = useState({});

    useEffect(() => {
        const getBeach = async () => {
            const response = await axios(`http://localhost:5000/beaches/find/${beachId}`)
            console.log(response);
            setBeach(response.data.beach);
        };
        getBeach();
    }, [beachId]);

    return (
        <div> 
                 
            <p >{oneBeach.name}</p>
            <p >{oneBeach.location}</p>
             
            
        </div>  
    )
    
};

export default Beach;