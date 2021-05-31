import { useState } from "react";
import "./Todo.css";
import TodoForm from "./TodoForm";

const Todo = ({ todo, isCompleted, id, updateTodo, completeTodo, deleteTodo }) => {

    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(true);
    }

    const handleUpdate = (formData) => {

        updateTodo(formData);

        setIsEdit(false);
    }

    if (!isEdit) {
        return (<div className="Todo" id={id} data-testid={`todo-${id}`}>
            <div className="Todo-control">
                <button className="Todo-btn-edit"
                    data-testid={`edit-${id}`}
                    onClick={() => { handleEdit(id) }}>
                    Edit
                    </button>
                <button className="Todo-btn-complete"
                    data-testid={`complete-${id}`}
                    onClick={() => { completeTodo(id) }}>
                    Mark as {isCompleted ? "not completed" : "completed"}
                </button>
                <button className="Todo-btn-delete"
                    data-testid={`del-${id}`}
                    onClick={() => { deleteTodo(id) }}>
                    X
                    </button>
            </div>
            <div className={`Todo-todo ${isCompleted ? 'Todo-todo-completed' : ''}`} data-testid={`todo-text-${id}`}>
                {todo}
            </div>
        </div>)
    } else {
        return (<div className="Todo" id={id}>
            <TodoForm id={id} todo={todo} updateTodo={handleUpdate} />
        </div>)
    }
}


export default Todo;