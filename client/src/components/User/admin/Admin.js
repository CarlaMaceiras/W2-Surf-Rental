import React from "react";
import { useHistory } from "react-router-dom";

const Admin = () => {
    
    let history = useHistory();

    const newEquipment = async (e) => {

        

        e.preventDefault();

        try {
            setTimeout(() => {
  
                history.push("/sports/newEquipment");
           
              }, 2000);
        } catch (err) {
            console.error(err.response.data);
        }
        


    };
    return (
        <div>
            <button type="button" class="btn btn-primary" onClick={newEquipment}>Crear nuevo material</button>
        </div>
    )

    
        
            
    
};

export default Admin;