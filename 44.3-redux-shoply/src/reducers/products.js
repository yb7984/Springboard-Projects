import { products } from '../data.json';
import { PRODUCTS_LOAD } from '../actionTypes';

const productsReducer = (state = {}, action) => {
    if (action.type === PRODUCTS_LOAD) {
        return { ...products };
    }
    return state;
}

export default productsReducer;