import {
    TITLE_LIST, TITLE_INSERT, TITLE_DELETE, TITLE_UPDATE,
    POST_DELETE, POST_GET,
    VOTE_UP, VOTE_DOWN
} from './actionTypes';

import { POST, VOTE } from './slugs';
import { setLoading, setError, formSet } from './actions';

import MicroBlogAPI from './api';

export function gotTitleList(titles) {
    return {
        type: TITLE_LIST,
        titles
    };
}
export function titleList() {
    return async function (dispatch) {
        dispatch(setLoading(POST, true));
        dispatch(setError(POST, false));
        try {
            const titles = await MicroBlogAPI.postList();

            dispatch(gotTitleList(titles));
        } catch (e) {
            console.log(e);
            dispatch(setError(POST, true));
        }
        dispatch(setLoading(POST, false));
    }
}

export function titleInsert(post) {
    return {
        type: TITLE_INSERT,
        post
    };
}

export function titleUpdate(post) {
    return {
        type: TITLE_UPDATE,
        post
    };
}

export function titleDelete(postId) {
    return {
        type: TITLE_DELETE,
        postId: parseInt(postId)
    }
}


export function gotPost(post) {
    return {
        type: POST_GET,
        post
    }
}

export function postGet(postId) {
    return async function (dispatch) {
        dispatch(setLoading(POST, true));
        dispatch(setError(POST, false));
        try {
            const post = await MicroBlogAPI.postGet(postId);

            dispatch(gotPost(post));
        } catch (e) {
            console.log(e);
            dispatch(setError(POST, true));
        }
        dispatch(setLoading(POST, false));
    }
}

export function postInsert(post) {
    return async function (dispatch) {
        dispatch(setLoading(POST, true));
        dispatch(setError(POST, false));
        try {
            const newPost = await MicroBlogAPI.postInsert(post);

            dispatch(formSet("newPostId", newPost.id));
            dispatch(gotPost(newPost));
            dispatch(titleInsert(newPost));
        } catch (e) {
            console.log(e);
            dispatch(setError(POST, true));
        }
        dispatch(setLoading(POST, false));
    }
};

export function postUpdate(post) {
    return async function (dispatch) {
        dispatch(setLoading(POST, true));
        dispatch(setError(POST, false));
        try {
            const newPost = await MicroBlogAPI.postUpdate(post);

            dispatch(formSet("editPostId", 0));
            dispatch(gotPost(newPost));
            dispatch(titleUpdate(newPost));
        } catch (e) {
            console.log(e);
            dispatch(setError(POST, true));
        }
        dispatch(setLoading(POST, false));
    }
}

export function postDelete(postId) {

    return async function (dispatch) {
        dispatch(setLoading(POST, true));
        dispatch(setError(POST, false));
        try {
            await MicroBlogAPI.postDelete(postId);

            dispatch({
                type: POST_DELETE,
                postId: parseInt(postId)
            });
            dispatch(titleDelete(postId));
        } catch (e) {
            console.log(e);
            dispatch(setError(POST, true));
        }
        dispatch(setLoading(POST, false));
    }
}

export function voteUp(post) {
    return async function (dispatch) {
        dispatch(setLoading(VOTE, true));
        dispatch(setError(VOTE, false));
        try {
            await MicroBlogAPI.vote(post.id, "up");

            dispatch({
                type: VOTE_UP,
                postId: post.id
            });

            dispatch(titleUpdate({
                ...post,
                votes: post.votes + 1
            }));
        } catch (e) {
            console.log(e);
            dispatch(setError(VOTE, true));
        }
        dispatch(setLoading(VOTE, false));
    }
}


export function voteDown(post) {
    return async function (dispatch) {
        dispatch(setLoading(VOTE, true));
        dispatch(setError(VOTE, false));
        try {
            await MicroBlogAPI.vote(post.id, "down");

            dispatch({
                type: VOTE_DOWN,
                postId: post.id
            });


            dispatch(titleUpdate({
                ...post,
                votes: post.votes - 1
            }));
        } catch (e) {
            console.log(e);
            dispatch(setError(VOTE, true));
        }
        dispatch(setLoading(VOTE, false));
    }
}
