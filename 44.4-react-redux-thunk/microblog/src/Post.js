import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import { postDelete, postGet } from './actionsPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommentList from './CommentList';
import { POST } from './slugs';
import Votes from './Votes';
const Post = () => {
    const { postId } = useParams();
    const post = useSelector(st => st.posts[postId], shallowEqual);
    const loading = useSelector(st => st.loading[POST]);
    const error = useSelector(st => st.error[POST]);
    const dispatch = useDispatch();
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        if (!post) {
            dispatch(postGet(postId));
        }
    }, [dispatch, postId, post]);

    const handleDelete = () => {
        dispatch(postDelete(postId));

        setDeleted(true);
    }

    if (deleted && !loading) {
        return <Redirect to="/" />;
    }

    if (loading || !post) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error</div>;
    }
    return (
        <div className="container mx-auto">
            <div className="h3 bg-light p-2">
                {post.title}
                <div className="float-right">
                    <Link to={`/posts/${postId}/edit`} className="btn btn-link text-primary">
                        <FontAwesomeIcon icon={['fas', 'edit']} />
                    </Link>
                    <button className="btn btn-link text-danger" onClick={handleDelete}>
                        <FontAwesomeIcon icon={['fas', 'trash-alt']} />
                    </button>
                </div>
            </div>
            <div className="p-2 font-italic">{post.description}</div>
            <div className="p-2">{post.body}</div>
            <div className="p-2 bg-light">
                <Votes post={post} />
            </div>
            <div className="p-2 h4">
                Comments
            </div>
            <div className="p-2">
                <CommentList postId={postId} comments={post.comments} />
            </div>
        </div>
    );
}

export default Post;