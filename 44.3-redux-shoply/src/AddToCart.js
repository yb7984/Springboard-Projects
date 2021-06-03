import { useDispatch } from 'react-redux';
import { cartUpdate } from './actions';
import './AddToCart.css';

const AddToCart = ({ productId, product }) => {

    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(cartUpdate(productId, product, 1));
    }
    return (
        <button className="AddToCart" onClick={handleAdd}>Add to cart</button>
    );
}

export default AddToCart;