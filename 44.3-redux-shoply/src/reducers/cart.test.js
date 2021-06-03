import cartReducer from './cart';
import { CART_UPDATE, CART_REMOVE } from '../actionTypes';

it('should return initial state', () => {
    expect(cartReducer(undefined, {})).toEqual({});
});


it('can handle CART_UPDATE', () => {
    // add to cart if not in cart yet
    let state = cartReducer(undefined, {
        type: CART_UPDATE,
        productId: "test",
        product: {
            name: "test product",
            price: "20"
        },
        count: 2
    });
    expect(state).toEqual({
        "test": {
            name: "test product",
            price: "20",
            count: 2
        }
    });

    // update the count if already in cart
    expect(cartReducer(state, {
        type: CART_UPDATE,
        productId: "test",
        product: {
            name: "test product",
            price: "20"
        },
        count: 2
    })).toEqual({
        "test": {
            name: "test product",
            price: "20",
            count: 4
        }
    });
});


it('can handle CART_REMOVE', () => {
    // add to cart if not in cart yet
    let state = cartReducer(undefined, {
        type: CART_UPDATE,
        productId: "test",
        product: {
            name: "test product",
            price: "20"
        },
        count: 2
    });
    expect(state).toEqual({
        "test": {
            name: "test product",
            price: "20",
            count: 2
        }
    });

    expect(cartReducer(state, {
        type: CART_REMOVE,
        productId: "test"
    })).toEqual({});
});