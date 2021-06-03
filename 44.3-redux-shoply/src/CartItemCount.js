import { useDispatch } from 'react-redux';
import { cartUpdate } from './actions';
import './CartItemCount.css';

const CartItemCount = ({ productId, cartItem }) => {

    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(cartUpdate(productId, cartItem, 1));
    }
    const handleSubtract = () => {
        dispatch(cartUpdate(productId, cartItem, -1));
    }
    return (
        <>
            <button className="CartItemCount-add" onClick={handleAdd}>+</button>
            <input type="number"
                value={cartItem.count}
                className="CartItemCount-count"
                name="count" id="count"
                readOnly />
            <button className="CartItemCount-substract" onClick={handleSubtract}>-</button>
        </>
    );
}

export default CartItemCount;