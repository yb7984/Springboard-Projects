import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { titleList } from "./actionsPost";
import PostListItem from "./PostListItem";
import { POST } from './slugs';

const PostList = () => {
    const titles = useSelector(st => st.titles, shallowEqual);

    const loading = useSelector(st => st.loading[POST]);
    const error = useSelector(st => st.error[POST]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!titles || titles.length === 0) {
            dispatch(titleList());
        }
    }, [dispatch, titles]);

    if (loading || !titles) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div className="container mx-auto p-0">
            {Object.values(titles).map(post => (
                <PostListItem key={post.id} post={post} />
            ))}
        </div>
    );
}

export default PostList;