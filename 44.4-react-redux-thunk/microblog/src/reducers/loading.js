import { LOADING_SET } from '../actionTypes';
import {POST , COMMENT , VOTE} from '../slugs';

const INITIAL_STATE = {
    [POST]: false,
    [COMMENT]: false,
    [VOTE]: false
};

const loadingReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case LOADING_SET:
            return {
                ...state,
                [action.slug]: action.loading
            };
        default:
            return state;
    }
}

export default loadingReducer;