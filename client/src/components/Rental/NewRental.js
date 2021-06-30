import React,{ useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const NewRental = () => {
    const {beachId, equipmentId} = useParams();
    
    const {user, setUser } = useState();

    let history = useHistory();

    useEffect( () => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem("w2_token");
                const response = await axios.post(`http://localhost:5000/rent/newRental/${beachId}`, 
                {
                    headers: {
                        "Authorization": token
                    }
                })
                console.log(response)
                setUser(response.data.user)
            }
            catch (err) {
                console.error(err.response.data);
                if(err.response.status === 401){
                  localStorage.removeItem("w2_token");
                  history.pushState("/login")
                }
            }
            
        };
        getUser();
    }, [beachId]);
}


export default NewRental;