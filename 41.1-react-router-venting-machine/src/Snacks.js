import {Link} from 'react-router-dom';
import './Snacks.css';

const Snacks = ({src=""}) => {
    return (<div className="Snacks">
        <img src={src} alt="Snacks" />

        <div className="Snacks-links">
            <Link exact to="/">Go back to venting machine!</Link>
        </div>
    </div>)
}


export default Snacks;