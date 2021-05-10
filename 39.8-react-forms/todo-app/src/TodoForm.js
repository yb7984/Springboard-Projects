import { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ updateTodo, id = "", todo = "" }) => {
    const INITIAL_STATE = {
        id: id,
        todo: todo
    };
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handSumit = (e) => {
        e.preventDefault();
        updateTodo(formData);

        setFormData(INITIAL_STATE);
    };
    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    return (<div className="TodoForm">
        <form onSubmit={handSumit}>
            <label htmlFor={`todo-${id}`} >{id === "" ? "New" : "Edit"} Todo:</label>
            <input type="text" id={`todo-${id}`} name="todo"
                placeholder="Things to do"
                value={formData.todo}
                onChange={(e) => { handleOnChange(e) }}
                required />

            <button>{id === "" ? "Add" : "Update"} Todo</button>
        </form>
    </div>);
}

export default TodoForm;