import { Link, Redirect, useParams } from 'react-router-dom';
import './Color.css';

const Color = ({ colors = [] }) => {
    const { colorName } = useParams();
    const color = colors.find(color => (color.name === colorName));

    if (color) {
        return (<div className="Color" style={{ backgroundColor: color.value }}>
                <h1>This is {color.name}</h1>
                <h1>Is it beautiful?</h1>
                <h1>
                    <Link to="/colors">Go back!</Link>
                </h1>
            </div >
        );
    } else {
        return <Redirect to="/colors" />;
    }
}

export default Color;