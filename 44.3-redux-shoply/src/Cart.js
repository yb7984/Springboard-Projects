import { useSelector } from "react-redux";
import './Cart.css';
import CartItem from "./CartItem";

const Cart = () => {

    const cart = useSelector(st => st.cart);

    return (
        <div className="Cart">
            <div className="Cart-List">
                <div className="Cart-Title">
                    <div className="Cart-Title-name">
                        Product
                    </div>
                    <div className="Cart-Title-count">
                        Count
                    </div>
                    <div className="Cart-Title-subtotal">
                        Subtotal
                    </div>
                </div>
                {
                    Object.entries(cart.products).map(([productId, item]) => {
                        return (<CartItem productId={productId} item={item} key={productId} />)
                    })
                }
            </div>
            <div className="Cart-Total">
                Total:${cart.totalPrice.toFixed(2)}
            </div>
        </div>
    );
}

export default Cart;