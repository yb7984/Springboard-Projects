import { NavLink } from "react-router-dom";
import CartIcon from "./CartIcon";
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="Navbar">
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/cart"><CartIcon /></NavLink>
        </div>
    );
}

export default Navbar;