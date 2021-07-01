import React,{ useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";

const MyRent = () => {
    const [myRent, setRent] = useState([]);

    let history = useHistory();

    useEffect (() => {
        const getRent = async () => {
            try {
                const token = localStorage.getItem("w2_token");
                const response = await axios.get("http://localhost:5000/rent//myRental",
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
        getRent()
    }, []);

    return (

        <div>

            {myRent.map(oneRent => {
                return (
                    
                    <div>    
                        <img src= {oneRent.sportEquipment.file.url} alt="logo"/>
                        
                        <p>{oneRent.beach.name}</p>
                    
                        <p>{oneRent.sportEquipment.model}</p>
                    
                        <p>{oneRent.sportEquipment.size}</p>
                            
                        <p>{oneRent.sportEquipment.level}</p>
                        <p>{oneRent.date}</p>
                    </div>         
                );
            })};

        </div>


    )



}

export default MyRent;