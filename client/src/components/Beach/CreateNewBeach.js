import React,{ useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateNewBeach= async () => {

    const {user, setUser } = useState();
    const body = {
        name: "name",
        location: "location"
    }
    const headers = { Authorization : 'Bearer my-token'}

    useEffect( () => {
        const getUser = async () => {

            const response = await axios.post(`http://localhost:5000/beaches/newBeach`, body, {headers})
            setUser(response.data.user)
            
        };
        getUser();
    }, []);

    
    
    
}

export default CreateNewBeach;