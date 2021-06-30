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
import CreateNewBeach from './components/Beach/CreateNewBeach';
import NewRental from './components/Rental/NewRental';
import Signup from './components/User/signup/Signup';
import Login from './components/User/login/Login';



function App() {
  
  return (
  
    <Router>
      <div className="App">

        <Navbar />
  
        <Switch>

          <Route path="/" exact={true}>   {/*Si no se pone exact, no entra en las rutas que tengas algo después de "/"*/}
            <h2>Inicio</h2>
          </Route>

          <Route path="/users/signup">
            <Signup />
          </Route>

          <Route path="/users/login">
            <Login />
          </Route>

          <Route path="/beaches" exact={true}>
            <Beaches />
          </Route>

          <Route path="/beaches/:beachId">
            <Beach />
          </Route>
          
          <Route path="/beaches/newBeach">
            <CreateNewBeach />
          </Route>

          <Route path="/sports" exact={true}>
            <SportEquipment />
          </Route> 

          <Route path="/rent/newRental/:beachId/:equipmentId/:date">
            <NewRental />
          </Route>

        </Switch>
       
      </div>
    </Router>
  );
     
};

export default App;
