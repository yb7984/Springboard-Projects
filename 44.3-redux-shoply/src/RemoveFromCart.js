import { useDispatch, useSelector } from 'react-redux';
import { cartRemove } from './actions';
import './RemoveFromCart.css';

const RemoveFromCart = ({ productId }) => {

    const dispatch = useDispatch();
    const cartItem = useSelector(st => st.cart.products[productId]);

    const handleRemove = () => {
        dispatch(cartRemove(productId));
    }

    if (cartItem) {
        return (
            <button className="RemoveFromCart" onClick={handleRemove}>Remove from cart</button>
        );
    }

    return '';
}
export default RemoveFromCart;