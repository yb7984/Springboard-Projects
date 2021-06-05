import { Link } from 'react-router-dom';
import Votes from './Votes';
const PostListItem = ({ post }) => {
    return (
        <div>
            <div className="h3 bg-light p-2"><Link to={`/posts/${post.id}`}>{post.title}</Link></div>
            <div className="p-2">{post.description}</div>
            <div className="p-2">
                <Votes post={post} />
            </div>
        </div>
    );
}

export default PostListItem;