import './DogDetails.css';
import {v4 as uuid} from 'uuid';

const DogDetails = ({ dog }) => {

    const { name, age, src, facts } = dog;
    return (
        <div className="DogDetails">
            <img src={src} alt={name} />
            <div>Name:{name}</div>
            <div>Age:{age}</div>
            <div>
                <ul>
                    {facts.map(fact => (<li key={uuid()}>{fact}</li>))}
                </ul>
            </div>
        </div>
    );
}

export default DogDetails;