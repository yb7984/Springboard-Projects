import { CART_UPDATE, CART_REMOVE, PRODUCTS_LOAD } from './actionTypes';

export const cartUpdate = (productId, product, count) => ({
    type: CART_UPDATE,
    productId,
    product,
    count
});

export const cartRemove = (productId) => ({
    type: CART_REMOVE,
    productId
});

export const productsLoad = () => ({
    type: PRODUCTS_LOAD
});