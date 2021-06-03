
import './ProductListItem.css';
import AddToCart from './AddToCart';
import RemoveFromCart from './RemoveFromCart';
import { Link } from 'react-router-dom';

const ProductListItem = ({ productId, product }) => {
    return (
        <div className="ProductListItem">
            <div className="ProductListItem-img">
                <img src={product.image_url} alt={product.name} />
            </div>
            <div className="ProductListItem-title">
                <Link to={`/products/${productId}`}>{product.name}</Link></div>
            <div className="ProductListItem-control">
                <AddToCart productId={productId} product={product} />
                <RemoveFromCart productId={productId} />
            </div>
        </div>
    );
}


export default ProductListItem;