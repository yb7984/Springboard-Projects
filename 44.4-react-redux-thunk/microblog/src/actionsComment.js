import {
    COMMENT_INSERT, COMMENT_UPDATE, COMMENT_DELETE
} from './actionTypes';

import { COMMENT } from './slugs';
import { setLoading, setError , formSet } from './actions';
import MicroBlogAPI from './api';

export function commentInsert(postId, comment) {
    return async function (dispatch) {
        dispatch(setLoading(COMMENT, true));
        dispatch(setError(COMMENT, false));
        try {
            const newComment = await MicroBlogAPI.commentInsert(postId, comment);

            dispatch(formSet("newCommentId", newComment.id));
            dispatch({
                type: COMMENT_INSERT,
                postId: parseInt(postId),
                comment: newComment
            });
        } catch (e) {
            console.log(e);
            dispatch(setError(COMMENT, true));
        }
        dispatch(setLoading(COMMENT, false));
    }
};

export function commentUpdate(postId, comment) {

    return async function (dispatch) {
        dispatch(setLoading(COMMENT, true));
        dispatch(setError(COMMENT, false));
        try {
            const newComment = await MicroBlogAPI.commentUpdate(postId, comment);

            dispatch(formSet("editCommentId", 0));
            dispatch({
                type: COMMENT_UPDATE,
                postId: parseInt(postId),
                comment: newComment
            });
        } catch (e) {
            console.log(e);
            dispatch(setError(COMMENT, true));
        }
        dispatch(setLoading(COMMENT, false));
    }
};


export function commentDelete(postId, commentId) {
    return async function (dispatch) {
        dispatch(setLoading(COMMENT, true));
        dispatch(setError(COMMENT, false));
        try {
            await MicroBlogAPI.commentDelete(postId, parseInt(commentId));

            dispatch({
                type: COMMENT_DELETE,
                postId: parseInt(postId),
                commentId: parseInt(commentId)
            });
        } catch (e) {
            console.log(e);
            dispatch(setError(COMMENT, true));
        }
        dispatch(setLoading(COMMENT, false));
    }
}
