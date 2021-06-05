import { TITLE_LIST, TITLE_INSERT, TITLE_UPDATE, TITLE_DELETE } from '../actionTypes';
const INITIAL_STATE = [];

const titlesReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case TITLE_LIST:
            return action.titles;

        case TITLE_INSERT:
            return [...state, {
                id: action.post.id,
                title: action.post.title,
                description: action.post.description,
                votes: action.post.votes
            }];
        case TITLE_UPDATE:
            return state.map(post => {
                if (action.post.id !== post.id) {
                    return post;
                } else {
                    return {
                        id: action.post.id,
                        title: action.post.title,
                        description: action.post.description,
                        votes: action.post.votes
                    }
                }
            });
        case TITLE_DELETE:
            return [...state.filter(post => (action.postId !== post.id))];
        default:
            return state;
    }
}

export default titlesReducer;