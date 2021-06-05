import { commentInsert, commentUpdate } from "./actionsComment";
import { useDispatch, useSelector } from 'react-redux';
import useFields from './hooks/useFields';
import { COMMENT } from "./slugs";

const CommentForm = ({ postId, comment = null, cancelEdit }) => {
    const dispatch = useDispatch();
    const editCommentId = useSelector(st => st.form.editCommentId);
    const initialValue = comment || {
        text: ""
    };

    const [formData, handleChange, resetForm] = useFields(initialValue);

    const loading = useSelector(st => st.loading[COMMENT]);
    const error = useSelector(st => st.error[COMMENT]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (comment) {
            dispatch(commentUpdate(postId, formData));
            cancelEdit();
        } else {
            dispatch(commentInsert(postId, formData));
            resetForm();
        }
    }

    if (!comment && editCommentId) {
        //don't show if this is for new comment and editing some comment
        return null;
    }

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-8">
                        <input id="text"
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            className="form-control"
                            required />
                    </div>
                    <div className="col-4">
                        <button className="btn btn-success">
                            {comment ? "Update" : "Add"}
                        </button>

                        {
                            cancelEdit &&
                            <button className="btn btn-danger" onClick={cancelEdit}>Cancel</button>
                        }
                    </div>
                </div>
            </form>
        </div>);
};
export default CommentForm;