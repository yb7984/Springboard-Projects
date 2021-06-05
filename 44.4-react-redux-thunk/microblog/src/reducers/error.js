import { ERROR_SET } from '../actionTypes';
import {POST , COMMENT , VOTE} from '../slugs';

const INITIAL_STATE = {
    [POST]: false,
    [COMMENT]: false,
    [VOTE]: false
};

const errorReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case ERROR_SET:
            return {
                ...state,
                [action.slug]: action.error
            };
        default:
            return state;
    }
}

export default errorReducer;