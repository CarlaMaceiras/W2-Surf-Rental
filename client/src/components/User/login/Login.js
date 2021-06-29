import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';

function Login(){

    let history = useHistory();

    const { beachId, equipmentId } = useParams();

    const [ email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
  
    const [successMessage, setSuccessMessage] = useState(null);
  
    const handleClick = async (e) => {
      e.preventDefault();                                                            //Así no hace refresh la página
  
      try{
        const response = await axios.post("http://localhost:5000/users/login", { email, password });
        console.log(response.data);
        setSuccessMessage("Login correcto");
        localStorage.setItem("w2_token", response.data.token)
        setTimeout(() => {

            if (!beachId || !equipmentId) {
                history.push("/beaches");
            }
            else {
                history.push("/rent/newRental/:beachId/:equipmentId");
            }
         
        }, 2000);
        
      }
      catch (err) {
        console.error(err.response.data);
        //aquí que muestre el mensaje de error props.showError(err.response.data.message) min 21:01. se tendrá que hacer con un componente a parte y pasarle un mensaje de error al showerror
      }
    };
  
  
  
  
  
    return (
      <div className= "card col-12 col-lg-4 login-card mt-2 hv-center">
          <Form>
  
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="" value= {email} onChange= {(e) => setEmail(e.target.value)}/>
            </FormGroup>
  
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="" value= {password} onChange= {(e) => setPassword(e.target.value)}/>
            </FormGroup>
  
            <Button type="submit" className="btn btn-primary" onClick= {handleClick}>Enviar</Button>
  
        </Form>
  
        <div className="alert alert-success mt-2" style={{ display: successMessage ? 'block' : 'none' }} role="alert">
          {successMessage}
        </div>
      </div>
    )
  }
  
  export default Login;