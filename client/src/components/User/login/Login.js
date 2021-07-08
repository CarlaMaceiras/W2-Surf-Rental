import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link} from 'react-router-dom';
import { API_BASE_URL } from '../../../constants/apiConstants';
import "./login.css"

function Login({getUser}){

    let history = useHistory();

    const [ email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
  
    const [successMessage, setSuccessMessage] = useState(null);
  
    const handleClick = async (e) => {
      e.preventDefault();                                                            //Así no hace refresh la página
  
      try{
        const response = await axios.post("/users/login", { email, password });
        console.log(response.data);
        setSuccessMessage("Login correcto");
        localStorage.setItem("w2_token", response.data.token)

        getUser();
        
        setTimeout(() => {
  
          history.push("/beaches");
     
        }, 2000);
        
      }
      catch (err) {
        console.error(err.response.data);
        //aquí que muestre el mensaje de error props.showError(err.response.data.message) min 21:01. se tendrá que hacer con un componente a parte y pasarle un mensaje de error al showerror
      }
    };
  
    return (

      <div>
        <div className="separador"> 
          <p>Login</p>
        </div>
        <div className= "card col-12 col-lg-4 login-card mt-2 hv-center">
          <form>
            <div className="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value= {email} onChange= {(e) => setEmail(e.target.value)}/> 
              
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="exampleInputPassword1" value= {password} onChange= {(e) => setPassword(e.target.value)}/>
            </div>

            <div className="boton-login"> 
              <button type="submit" class="btn btn-primary" onClick= {handleClick}>Log in</button>
            </div>

            <div className="registro">
              <div>
                <p>¿Aún no tienes cuenta?</p>
              </div>
              <div className="link">
                <Link  to={`/users/signup`}>Registrate</Link>
              </div>
            </div>
          </form>
    
          <div className="alert alert-success mt-2" style={{ display: successMessage ? 'block' : 'none' }} role="alert">
            {successMessage}
          </div>
        </div>
      </div>
    );
};
  
  export default Login;