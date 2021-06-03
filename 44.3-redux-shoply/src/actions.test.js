import { faItalic } from '@fortawesome/free-solid-svg-icons';
import { cartUpdate, cartRemove, productsLoad } from './actions';
import { CART_UPDATE, CART_REMOVE, PRODUCTS_LOAD } from './actionTypes';

it('cartUpdate works', () => {
    expect(cartUpdate('testId', { name: 'test' }, 1)).toEqual(
        {
            type: CART_UPDATE,
            productId: 'testId',
            product: { name: 'test' },
            count: 1
        }
    );
});