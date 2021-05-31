import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import "./TodoList.css";
import { useSelector, useDispatch } from 'react-redux';

const TodoList = () => {


    const todoes = useSelector(st => st.todoes);
    const dispatch = useDispatch();

    const completeTodo = (id) => {
        dispatch({ type: "COMPLETE", todoId: id });
    }
    const deleteTodo = (id) => {
        dispatch({ type: "REMOVE", todoId: id });
    }

    const addTodo = (newTodo) => {
        const newId = uuidv4();

        dispatch({
            type: "APPEND",
            todo: { ...newTodo, id: newId }
        });
    }

    const updateTodo = (newTodo) => {
        dispatch({
            type: "APPEND",
            todo: newTodo
        });
    }

    return (<div className="TodoList">
        <NewTodoForm addTodo={addTodo} />
        <div className="TodoList-list">
            {Object.entries(todoes).map(([id, todo]) => {
                return <Todo
                    key={id}
                    todo={todo.todo}
                    isCompleted={todo.isCompleted}
                    id={id}
                    updateTodo={updateTodo}
                    completeTodo={completeTodo}
                    deleteTodo={deleteTodo} />
            })}
        </div>
    </div>);
};

export default TodoList;