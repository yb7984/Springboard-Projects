import { Link } from 'react-router-dom';
import './DogList.css';

const DogList = ({ dogs = [] }) => {
    return (
        <div className="DogList">
            {
                dogs.map(dog => {
                    return (<div className="DogList-item" key={dog.name}>
                        <img src={dog.src} alt={dog.name} />
                        <Link to={`/dogs/${dog.name}`}>{dog.name}</Link>
                    </div>);
                })
            }
        </div>
    );
}

export default DogList;