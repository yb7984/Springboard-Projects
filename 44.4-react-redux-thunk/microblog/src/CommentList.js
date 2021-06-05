import { formSet } from "./actions";
import CommentForm from "./CommentForm";
import CommentListItem from "./CommentListItem";
import { useSelector, useDispatch } from "react-redux";

const CommentList = ({ comments, postId }) => {
    const dispatch = useDispatch();
    const editCommentId = useSelector(st => st.form.editCommentId);
    const startEdit = (commentId) => {
        dispatch(formSet("editCommentId", commentId));
    }
    const cancelEdit = () => {
        dispatch(formSet("editCommentId", 0));
    }

    return (
        <div>
            <div>
                {
                    comments &&
                    comments.map(comment => (
                        editCommentId === comment.id ?
                            (
                                <CommentForm comment={comment}
                                    postId={postId} key={comment.id}
                                    cancelEdit={cancelEdit} />
                            )
                            :
                            (
                                <CommentListItem
                                    startEdit={startEdit}
                                    postId={postId}
                                    comment={comment}
                                    key={comment.id} />
                            )
                    ))
                }
            </div>
            <div>
                <CommentForm postId={postId} />
            </div>
        </div>
    );
};

export default CommentList;