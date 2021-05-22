import { Link } from "react-router-dom"
import './Nav.css';

const Nav = ({ dogs }) => {
    return (
        <nav className="Nav">
            <Link to='/dogs'>All Dogs</Link>
            {
                dogs.map(dog => (
                    <Link key={dog.name} to={`/dogs/${dog.name}`}>{dog.name}</Link>
                ))
            }
        </nav>
    );
}

export default Nav;