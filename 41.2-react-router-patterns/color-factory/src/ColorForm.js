import { useState } from "react";
import {Link} from 'react-router-dom';
import './ColorForm.css';

const ColorForm = ({ colors, addColor }) => {

    const INITIAL_STATE = {
        name: "",
        value: "#FFFFFF"
    };
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (colors.find(color => (color.name === formData.name))) {
            alert("Color Name has been used, please choose another one!");
            return;
        }

        addColor(formData.name, formData.value);

        setFormData(INITIAL_STATE);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    return (
        <div className="ColorForm">
            <form onSubmit={handleSubmit}>
                <div className="ColorForm-field">
                    <label htmlFor="name">Color Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleOnChange} required />
                </div>
                <div className="ColorForm-field">
                    <label htmlFor="value">Color Value:</label>
                    <input type="color" id="value" name="value" value={formData.value} onChange={handleOnChange} required />
                </div>
                <button>Add Color!</button>
            </form>
            <h1>
                <Link to="/colors">Go back!</Link>
            </h1>
        </div>
    )
}

export default ColorForm;