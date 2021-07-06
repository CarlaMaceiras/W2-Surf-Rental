import "./myProfile.css";
import { Link } from "react-router-dom";


const MyProfile= ({user}) => {

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }
   

    return(
        <div>
            <p>{user?.name}</p>
            <p>{user?.surname}</p>
            <p>{user?.email}</p>
            <Link to="/rent/myRent">Mis Reservas</Link>
            <button type="button" className="btn btn-primary" onClick={logout} >Log-Out</button>

        </div>
    )




}

export default MyProfile;