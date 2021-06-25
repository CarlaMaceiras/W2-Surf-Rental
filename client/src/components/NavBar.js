import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">HOME</Link>                  
                </li>

                <li>
                    <Link to="/beaches">BEACH</Link>
                </li>

            </ul>
        </nav>
    );
};

export default NavBar;