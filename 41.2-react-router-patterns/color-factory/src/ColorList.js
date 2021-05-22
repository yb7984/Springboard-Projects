import { Link } from 'react-router-dom';
import './ColorList.css';

const ColorList = ({ colors = [] }) => (
    <div className="ColorList">
        <div className="ColorList-header">
            <h1>Welcome to the color factory</h1>
            <h2><Link to='/colors/new'>Add a color</Link></h2>
        </div>
        <div>
            <h1>Please select a color:</h1>
            
            {
                colors.map(color => (
                    <div key={color.name} className="ColorList-colors">
                        <Link to={`/colors/${color.name}`}>{color.name}</Link>
                    </div>
                ))}
        </div>
    </div>
)

export default ColorList;