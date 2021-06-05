import {
    POST_INSERT, POST_UPDATE, POST_DELETE, POST_GET,
    COMMENT_INSERT, COMMENT_UPDATE, COMMENT_DELETE,
    VOTE_UP, VOTE_DOWN
} from '../actionTypes';

const INITIAL_STATE = {};

const postsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case POST_GET:
        case POST_INSERT:
        case POST_UPDATE:
            if (action.post) {
                return {
                    ...state,
                    [action.post.id]: action.post
                };
            }
            return state;
        case POST_DELETE:
            const { [action.postId]: remove, ...newState } = state;
            return newState;

        case COMMENT_INSERT:
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    comments: [
                        ...state[action.postId].comments,
                        action.comment
                    ]
                }
            };
        case COMMENT_UPDATE:
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    comments: state[action.postId].comments.map(comment => {
                        if (comment.id === action.comment.id) {
                            return action.comment;
                        }
                        return comment;
                    })
                }
            };
        case COMMENT_DELETE:
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    comments: state[action.postId].comments.filter(comment => {
                        if (comment.id === action.commentId) {
                            return false;
                        }
                        return true;
                    })
                }
            };

        case VOTE_UP:
            if (state[action.postId]) {
                return {
                    ...state,
                    [action.postId]: {
                        ...state[action.postId],
                        votes: state[action.postId].votes + 1
                    }
                };
            }
            break;
        case VOTE_DOWN:
            if (state[action.postId]) {
                return {
                    ...state,
                    [action.postId]: {
                        ...state[action.postId],
                        votes: state[action.postId].votes - 1
                    }
                };
            }
            break;
        default:
            return state;
    }

    return state;
}

export default postsReducer;