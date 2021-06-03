import './CartItem.css';
import CartItemCount from './CartItemCount';

const CartItem = ({ productId, item }) => {
    return (
        <div className="CartItem">
            <div className="CartItem-name">
                {item.name}
            </div>
            <div className="CartItem-count">
                <CartItemCount productId={productId} cartItem={item} />
            </div>
            <div className="CartItem-subtotal">
                ${(item.price * item.count).toFixed(2)}
            </div>
        </div>
    );
};

export default CartItem;