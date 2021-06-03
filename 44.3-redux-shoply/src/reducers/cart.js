import { CART_UPDATE, CART_REMOVE } from '../actionTypes';

const INITIAL_STATE = {
    products: {},
    totalItems: 0,
    totalPrice: 0
};

const cartReducer = (state = INITIAL_STATE, action) => {
    const getTotalPrice = (products) => {
        let total = 0;
        Object.values(products).forEach(item => {
            total += item.price * item.count;
        })

        return total;
    }

    const getTotalItems = (products) => {
        let total = 0;
        Object.values(products).forEach(item => {
            total += item.count;
        })

        return total;
    }

    let newProducts = null;

    switch (action.type) {
        case CART_UPDATE:
            if (state.products[action.productId]) {
                if (state.products[action.productId].count + action.count > 0) {
                    newProducts = {
                        ...state.products,
                        [action.productId]: {
                            ...state.products[action.productId],
                            count: state.products[action.productId].count + action.count
                        }
                    };
                } else {
                    //remove from the cart if count <= 0
                    const { [action.productId]: remove, ...newState } = state.products;
                    newProducts = newState;
                }
            } else {
                if (action.count <= 0) {
                    newProducts = state.products;
                }
                else {
                    newProducts = {
                        ...state.products,
                        [action.productId]: {
                            ...action.product,
                            count: action.count
                        }
                    };
                }
            }
            break;
        case CART_REMOVE:
            const { [action.productId]: remove, ...newState } = state.products;
            newProducts = newState;
            break;

        default:
            newProducts = state.products;
    }

    return {
        products: newProducts,
        totalItems: getTotalItems(newProducts),
        totalPrice: getTotalPrice(newProducts)
    }
}

export default cartReducer;