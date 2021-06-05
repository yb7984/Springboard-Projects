import { NavLink } from "react-router-dom";

const Header = () => (
    <div className="container mx-auto bg-light">
        <div className="display-3 p-2">Microblog</div>
        <div className="display-5 p-2">Get in the Rithm of blogging!</div>
        <div className="row p-2 h4 bg-dark">
            <div className="col">
                <NavLink exact to="/">Blog</NavLink>
            </div>
            <div className="col text-right">
                <NavLink exact to="/new">Add a new post</NavLink>
            </div>
        </div>
    </div>
);

export default Header;