import './App.css';
import Beaches  from "./components/Beaches";
import Navbar from "./components/NavBar";
import Beach from './components/Beach';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";


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

          {/* <Route path="/sportEquipment/:equipmentId">
            <SportEquipment />
          </Route> */}

        </Switch>
       
      </div>
    </Router>
  );
     
};

export default App;
