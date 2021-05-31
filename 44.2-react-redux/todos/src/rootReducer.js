
const getTodoesFromLocalStorage = () => {
    const data = localStorage.getItem('todo-list');

    if (data === null) {
        return {};
    } else {
        return JSON.parse(data);
    }
}

const saveToLocalStorage = (todoes) => {
    //save to localStorage
    localStorage.setItem('todo-list', JSON.stringify(todoes));
}

const INITIAL_STATE = { todoes: getTodoesFromLocalStorage() };

const rootReducer = (state = INITIAL_STATE, action) => {
    let newState;
    switch (action.type) {
        case "APPEND":
        case "UPDATE":
            newState = {
                ...state,
                todoes: {
                    ...state.todoes,
                    [action.todo.id]: { ...action.todo }
                }
            };
            break;

        case "COMPLETE":
            newState = {
                ...state,
                todoes: {
                    ...state.todoes,
                    [action.todoId]: {
                        ...state.todoes[action.todoId],
                        isCompleted: !state.todoes[action.todoId].isCompleted
                    }
                }
            };
            break;
        case "REMOVE":
            const { [action.todoId]: remove, ...newTodos } = state.todoes;
            newState = {
                ...state,
                todoes: newTodos
            };
            break;
        default:
            newState = state;
            break;
    }

    saveToLocalStorage(newState.todoes);

    return newState;
};

export default rootReducer;