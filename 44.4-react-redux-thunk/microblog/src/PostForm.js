import { useSelector, useDispatch } from 'react-redux';
import { postInsert, postUpdate } from './actionsPost';
import FormInput from "./FormInput";
import { POST } from './slugs';
import useFields from './hooks/useFields';
import { Redirect, Link } from 'react-router-dom';

const PostForm = ({ post = null }) => {
    const newPostId = useSelector(st => st.form.newPostId);
    const editPostId = useSelector(st => st.form.editPostId);
    const loading = useSelector(st => st.loading[POST]);
    const error = useSelector(st => st.error[POST]);
    const dispatch = useDispatch();

    const [formData, handleChange] = useFields(post ||
    {
        title: "",
        description: "",
        body: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!post) {
            dispatch(postInsert(formData));
        } else {
            dispatch(postUpdate(formData));
        }
    }

    if (newPostId && !post) {
        return <Redirect to={`/posts/${newPostId}`} />;
    }
    if (post && editPostId === 0) {
        return <Redirect to={`/posts/${post.id}`} />;
    }

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="h2">
                {formData.id ? "Edit Post" : "New Post"}
            </div>
            <form onSubmit={handleSubmit}>
                <FormInput title="Title"
                    name="title"
                    value={formData.title}
                    placeholder="Input post title here"
                    required={true}
                    handleChange={handleChange} />
                <FormInput title="Description"
                    name="description"
                    type="textarea"
                    value={formData.description}
                    placeholder="Input post description here"
                    required={true}
                    handleChange={handleChange} />
                <FormInput title="Body"
                    name="body"
                    type="textarea"
                    value={formData.body}
                    placeholder="Input post body here"
                    required={true}
                    handleChange={handleChange}
                    rows={8} />

                <div>
                    <button className="btn btn-lg btn-success mx-2">Submit</button>
                    <Link to={formData.id ? `/posts/${formData.id}` : '/'} className="btn btn-lg btn-danger mx-2">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export default PostForm;