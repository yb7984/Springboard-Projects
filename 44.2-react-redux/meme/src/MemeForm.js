import useFields from './useFields';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import './MemeForm.css';

const MemeForm = ({ generate }) => {

    const [formData, handleChange, resetFormData] = useFields({
        image: "",
        top: "",
        bottom: ""
    });

    const dispatch = useDispatch();
    const meme = useSelector(st => st.meme)

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData)

        dispatch({ type: "APPEND", meme: { ...formData, id: uuid() } });

        console.log(meme);

        resetFormData();
    }

    return (
        <div className="MemeForm">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image">Image Url:</label>
                    <input type="url" name="image" id="image" onChange={handleChange} value={formData.image} required />
                </div>
                <div>
                    <label htmlFor="top">Top Text:</label>
                    <input type="text" name="top" id="top" onChange={handleChange} value={formData.top} />
                </div>
                <div>
                    <label htmlFor="bottom">Bottom Text:</label>
                    <input type="text" name="bottom" id="bottom" onChange={handleChange} value={formData.bottom} />
                </div>
                <div>
                    <button>Generate!</button>
                </div>
            </form>
        </div>
    );
}

export default MemeForm;