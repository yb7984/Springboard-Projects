import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import PostForm from "./PostForm";
import { postGet } from './actionsPost';
import { formSet } from './actions';

const PostEdit = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(st => st.posts[postId], shallowEqual);

    useEffect(() => {
        if (!post) {
            //load data if not loaded yet.
            dispatch(postGet(postId));
        }

    }, [dispatch, postId, post]);

    if (post) {
        dispatch(formSet("editPostId", postId));

        return (
            <PostForm post={post} />)
    } else {
        return <div>Loading</div>;
    }
}

export default PostEdit;