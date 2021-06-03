import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CartIcon.css';

const CartIcon = () => {

    const totalItems = useSelector(st => st.cart.totalItems);

    return (
        <span className="CartIcon">
            <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
            {totalItems}
        </span>
    );
}

export default CartIcon;