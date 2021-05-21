import { Link } from 'react-router-dom';
import imgVentingMachine from './venting-machine.jpg';
import './VentingMachine.css';

const VentingMachine = () => {
    return (<div className="VentingMachine">
        <img src={imgVentingMachine}/>
        <div className="VentingMachine-links">
            <Link exact to="/soda">Soda</Link>
            <Link exact to="/chips">Chips</Link>
            <Link exact to="/candies">Candies</Link>
        </div>
    </div>)
}


export default VentingMachine;