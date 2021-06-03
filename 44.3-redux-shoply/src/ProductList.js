
import ProductListItem from './ProductListItem';
import './ProductList.css';

const ProductList = ({ products }) => {
    return (
        <div className="ProductList">
            {Object.entries(products).map(([key, value]) => (<ProductListItem productId={key} product={value} key={key} />))}
        </div>
    );
}


export default ProductList;