import "./myProfile.css";
import { Link } from "react-router-dom";
import fotoPerfil from "../../images/foto_perfil2.jpg";


const MyProfile= ({user}) => {

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }
   

    return(
        <div>

            <div className="separador"> 
                <p>Mi perfil</p>
            </div>
            <div className= "perfil card col-12 col-lg-4 login-card mt-2 hv-center">

                <div className="foto_perfil">
                    <img src={fotoPerfil} alt="Foto perfil"/>
                </div>
          
                <div className="mi_perfil mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre:</label>
                    <p>{user?.name}</p>

                    <label for="exampleInputEmail1" class="form-label">Apellidos:</label>
                    <p>{user?.surname}</p>

                    <label for="exampleInputEmail1" class="form-label">Email:</label>
                    <p>{user?.email}</p>
                
                    <div className="perfil_link">
                        <Link to="/rent/myRent">Mis Reservas</Link>
                    </div>
                </div>

            </div>
            <div className="boton_logout">
                <button type="button" className="btn btn-primary" onClick={logout} >Log-Out</button>
            </div>

        </div>
    )




}

export default MyProfile;