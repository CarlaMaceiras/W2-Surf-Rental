import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';


function Signup(){

  let history = useHistory();

  const [ name, setName ] = useState("");
  const [ surname, setSurname ] = useState("");
  const [ email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");

  const [successMessage, setSuccessMessage] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();                                                            //Así no hace refresh la página

    try{
      const body = {
        name,
        surname,
        email,
        password
      };
      
      const response = await axios.post("http://localhost:5000/users/signup", body);
      console.log(response);
      setSuccessMessage("Usuario creado correctamente");
      setTimeout(() => {
        history.push("/login");
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

          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="examplePassword">Nombre</Label>
            <Input type="text" name="name" id="userName" placeholder="" value= {name} onChange= {(e) => setName(e.target.value)}/>  {/* función que llama a setEmail. e= (event del onChange) que nos coge el valor del imput. target (es el imput completo) */}
          </FormGroup>

          <FormGroup>
            <Label for="exampleEmail">Apellidos</Label>
            <Input type="text" name="surname" id="userSurname" placeholder="" value= {surname} onChange= {(e) => setSurname(e.target.value)}/>
          </FormGroup>

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

export default Signup;