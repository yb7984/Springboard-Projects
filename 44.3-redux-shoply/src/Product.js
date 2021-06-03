import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import AddToCart from './AddToCart';
import RemoveFromCart from './RemoveFromCart';
import './Product.css';

const Product = () => {
    const { productId } = useParams();

    const product = useSelector(st => st.products[productId]);

    if (!product) {
        return (<Redirect to='/' />);
    }

    return (
        <div className="Product">
            <div className="Product-img">
                <img src={product.image_url} alt={product.name} />
            </div>
            <div className="Product-title">{product.name}</div>
            <div className="Product-price">Price: {product.price}</div>
            <div className="Product-description">{product.description}</div>
            <div className="Product-control">
                <AddToCart productId={productId} product={product} />
                <RemoveFromCart productId={productId} />
            </div>
        </div>
    );
}


export default Product;