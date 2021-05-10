import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import "./TodoList.css";

const TodoList = () => {

    const getTodoesFromLocalStorage = () => {
        const data = localStorage.getItem('todo-list');

        if (data === null) {
            return {};
        } else {
            return JSON.parse(data);
        }
    }

    //init the todoes list from localStorage if available
    const [todoes, setTodoes] = useState(getTodoesFromLocalStorage());

    const completeTodo = (id) => {
        setTodoes(oldTodoes => ({
            ...oldTodoes,
            [id]: {
                ...oldTodoes[id],
                isCompleted: !oldTodoes[id].isCompleted
            }
        }));
    }
    const deleteTodo = (id) => {
        setTodoes(oldTodoes => {
            const { [id]: remove, ...newTodoes } = oldTodoes;

            return newTodoes;
        });
    }

    const addTodo = (newTodo) => {
        const newId = uuidv4();

        setTodoes(oldTodoes => (
            {
                ...oldTodoes,
                [newId]: {
                    ...newTodo,
                    id: newId
                }
            }
        ));
    }

    const updateTodo = (newTodo) => {
        setTodoes(oldTodoes => (
            {
                ...oldTodoes,
                [newTodo.id]: {
                    ...oldTodoes[newTodo.id],
                    todo: newTodo.todo
                }
            }
        ));
    }

    //save to localStorage
    localStorage.setItem('todo-list' , JSON.stringify(todoes));

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