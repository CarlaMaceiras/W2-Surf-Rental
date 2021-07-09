import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from '../../../constants/apiConstants';


function Signup(props){

  let history = useHistory();

  const [ name, setName ] = useState("");
  const [ surname, setSurname ] = useState("");
  const [ email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");

  const [successMessage, setSuccessMessage] = useState(null);
  
  

  const handleClick = async (e) => {
    e.preventDefault();                                   //Así no hace refresh la página
    props.showError(null) 
                                                              

    try{
      const body = {
        name,
        surname,
        email,
        password
      };
      
      const response = await axios.post("/api/users/signup", body);
      console.log(response);
      setSuccessMessage("Usuario creado correctamente");
      props.showError(null)
      setTimeout(() => {
        history.push("/users/login");
      }, 2000);
      
    }
    catch (err) {
      console.error(err.response.data);
      props.showError(err.response.data.message);    //Le manda el mensaje de error al showerror. Esta prop le viene del app.js
    }
  };





  return (
    
    <div>
      <div className="separador"> 
          <p>Registrarse</p>
      </div>
    
      <div className= "card col-12 col-lg-4 login-card mt-2 hv-center">
        <form>
          
          <div class="mb-3">
            <label for="exampleInputName" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="exampleInputName"  value= {name} onChange= {(e) => setName(e.target.value)}/>    {/* función que llama a setEmail. e= (event del onChange) que nos coge el valor del imput. target (es el imput completo) */}
          </div>

          <div class="mb-3">
            <label for="exampleInputSurname" class="form-label">Apellidos</label>
            <input type="text" class="form-control" id="exampleInputSurname"  value= {surname} onChange= {(e) => setSurname(e.target.value)}/> 
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value= {email} onChange= {(e) => setEmail(e.target.value)}/> 
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="exampleInputPassword1" value= {password} onChange= {(e) => setPassword(e.target.value)}/>
          </div>

          <div className="boton-login">
            <button type="submit" class="btn btn-primary" onClick= {handleClick}>Registrarse</button>
          </div>
        </form>

        <div className="alert alert-success mt-2" style={{ display: successMessage ? 'block' : 'none' }} role="alert">
            {successMessage}
          </div>

      </div>
    </div>
  )
}

export default Signup;