import './App.css';
import Beaches  from "./components/Beaches";
import Navbar from "./components/NavBar";
import SportEquipment from "./components/SportEquipment";
import Beach from './Pages/Beach';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import CreateNewBeach from './Pages/CreateNewBeach';



function App() {
  
  return (
  
    <Router>
      <div className="App">

        <Navbar />
  
        <Switch>

          <Route path="/" exact={true}>   {/*Si no se pone exact, no entra en las rutas que tengas algo después de "/"*/}
            <h2>Inicio</h2>
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

        </Switch>
       
      </div>
    </Router>
  );
     
};

export default App;
