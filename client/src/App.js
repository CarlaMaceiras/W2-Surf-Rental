import './App.css';
import Beaches  from "./components/Beach/Beaches";
import Navbar from "./components/Header/NavBar";
import SportEquipment from "./components/SportEquipment/SportEquipment";
import Beach from './components/Beach/Beach';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import NewRental from './components/Rental/NewRental';
import Signup from './components/User/signup/Signup';
import Login from './components/User/login/Login';
import MyRent from './components/Rental/MyRent';
import PrivateRoute from './utils/PrivateRoute';
import axios from 'axios';
import { API_BASE_URL } from './constants/apiConstants';
import { useEffect, useState } from 'react';


const App = () => {

  const [user, setUser ] = useState();

  const getUser = async () => {
    const token = localStorage.getItem("w2_token")
    const response = await axios(`${API_BASE_URL}/users/login/oneUser`, {
      headers: {
        "Authorization": token
      }
    })
    setUser(response.data.oneUser)
  }

  useEffect(() => {
    
    if(localStorage.getItem("w2_token")){
      getUser()
    }

  }, []);
  
  return (
  
    <Router>
      <div className="App">

        <Navbar user={user}/>
  
        <Switch>

          <Route path="/" exact={true}>   {/*Si no se pone exact, no entra en las rutas que tengas algo después de "/"*/}
            <h2>Inicio</h2>
          </Route>

          <Route path="/users/signup">
            <Signup />
          </Route>

          <Route path="/users/login">
            <Login  getUser= {getUser}/>
          </Route>

          <Route path="/beaches" exact={true}>
            <Beaches />
          </Route>

          <Route path="/beaches/:beachId">
            <Beach />
          </Route>

          <Route path="/sports" exact={true}>
            <SportEquipment />
          </Route> 

          <PrivateRoute path="/rent/newRental/:beachId/:equipmentId/:date/:quantity">
            <NewRental />
          </PrivateRoute>

          <Route path="/rent/myRent">
            <MyRent />
          </Route>

          <Route path="*" component={() => "404 NOT FOUND"}></Route>

        </Switch>
       
      </div>
    </Router>
  );
     
};

export default App;
