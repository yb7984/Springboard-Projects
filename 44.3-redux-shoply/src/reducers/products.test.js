import { PRODUCTS_LOAD } from '../actionTypes';
import productsReducer from './products';

it('should return initial state', () => {
    expect(productsReducer(undefined, {})).toEqual({});
});


it('should handle PRODUCTS_LOAD', () => {
    const state = productsReducer(undefined, {
        type: PRODUCTS_LOAD
    });
    expect(Object.keys(state).length).toBeGreaterThan(0);
});