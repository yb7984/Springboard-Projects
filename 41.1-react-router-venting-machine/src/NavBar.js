import { NavLink } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="NavBar">
            <NavLink exact to="/">
                VentingMachine
            </NavLink>
            <NavLink exact to="/soda">
                Soda
            </NavLink>
            <NavLink exact to="/chips">
                Chips
            </NavLink>
            <NavLink exact to="/candies">
                Candies
            </NavLink>
        </nav>
    )
}

export default NavBar;