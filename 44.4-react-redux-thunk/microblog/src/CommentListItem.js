import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { commentDelete } from "./actionsComment";
import { memo } from 'react';

const CommentListItem = memo(({ postId, comment, startEdit }) => {

    const dispatch = useDispatch();

    const deleteComment = () => {
        dispatch(commentDelete(postId, comment.id));
    }

    return (
        <div>
            <button className="btn btn-link text-danger" onClick={deleteComment}>
                <FontAwesomeIcon icon={["fas", "trash-alt"]} /></button>
            <button className="btn btn-link text-primary" onClick={() => {
                startEdit(comment.id);
            }}>
                <FontAwesomeIcon icon={["fas", "edit"]} /></button>
            {comment.text}
        </div>
    );
});

export default CommentListItem;