import { FORM_SET, FORM_RESET } from '../actionTypes';

const INITIAL_STATE = {
    newPostId: 0,
    newCommentId: 0,
    editPostId: 0,
    editCommentId: 0
};

const formReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FORM_SET:
            return {
                ...state,
                [action.field]: action.id
            };
        case FORM_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default formReducer;