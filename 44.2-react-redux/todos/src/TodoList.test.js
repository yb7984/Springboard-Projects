import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import TodoList from './TodoList';
import { v4 as uuidv4, reset as uuidReset } from 'uuid';

it("renders without crashing", function () {
    render(<TodoList />);
});


it("matches snapshot", function () {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

//mock the uuid
jest.mock('uuid', () => {
    let counter = 0;

    return {
        v4: () => {
            counter++;
            return counter;
        },

        reset: () => {
            counter = 0;
        }
    };
});

//mock localStorage
global.localStorage = () => {
    const data = {};

    return {
        getItem: (keyName) => {
            return data[keyName];
        },

        setItem: (keyName, keyValue) => {
            data[keyName] = keyValue;
        }
    };
}

it("add new todo works", function () {
    uuidReset();

    const { asFragment, queryByTestId, queryByLabelText, queryByText, debug } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();

    const newInput = queryByLabelText('New Todo:');
    const addButton = queryByText('Add Todo');

    expect(newInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();

    expect(queryByTestId('todo-1')).not.toBeInTheDocument();

    fireEvent.change(newInput, { target: { value: "test todo" } });

    fireEvent.click(addButton);

    //works after click the add button
    const todo = queryByTestId('todo-1');
    const editButton = queryByTestId('edit-1');
    const completeButton = queryByTestId('complete-1');
    const deleteButton = queryByTestId('del-1');
    const todoText = queryByTestId('todo-text-1');
    expect(todo).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(completeButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(todoText).toBeInTheDocument();

    expect(todoText).toHaveTextContent("test todo");
    expect(todoText).not.toHaveClass('Todo-todo-completed');

    //save to localStorage
    expect(localStorage.getItem('todo-list')).toContain('test todo');
});


it("edit todo works", function () {
    uuidReset();

    const { asFragment, queryByTestId, queryByLabelText, queryByText, debug } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();

    const newInput = queryByLabelText('New Todo:');
    const addButton = queryByText('Add Todo');

    fireEvent.change(newInput, { target: { value: "test todo" } });
    fireEvent.click(addButton);

    //works after click the edit button
    fireEvent.click(queryByTestId('edit-1'));

    expect(queryByTestId('todo-text-1')).not.toBeInTheDocument();

    const editInput = queryByLabelText('Edit Todo:');
    const updateButton = queryByText('Update Todo');
    expect(editInput).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();

    fireEvent.change(editInput, { target: { value: "test todo updated" } });
    fireEvent.click(updateButton);

    expect(queryByTestId('todo-text-1')).toBeInTheDocument();
    expect(queryByTestId('todo-text-1')).toHaveTextContent('test todo updated');
});


it("complete todo works", function () {
    uuidReset();

    const { asFragment, queryByTestId, queryByLabelText, queryByText, debug } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();

    const newInput = queryByLabelText('New Todo:');
    const addButton = queryByText('Add Todo');

    fireEvent.change(newInput, { target: { value: "test todo" } });
    fireEvent.click(addButton);

    const completeButton = queryByTestId('complete-1');
    const todoText = queryByTestId('todo-text-1');

    expect(todoText).not.toHaveClass('Todo-todo-completed');

    //works after click the complete button
    fireEvent.click(completeButton);

    expect(todoText).toHaveClass('Todo-todo-completed');

    fireEvent.click(completeButton);

    expect(todoText).not.toHaveClass('Todo-todo-completed');
});



it("delete todo works", function () {
    uuidReset();

    const { asFragment, queryByTestId, queryByLabelText, queryByText, debug } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();

    const newInput = queryByLabelText('New Todo:');
    const addButton = queryByText('Add Todo');

    fireEvent.change(newInput, { target: { value: "test todo" } });
    fireEvent.click(addButton);

    const deleteButton = queryByTestId('del-1');

    //works after click the delete button
    fireEvent.click(deleteButton);

    expect(queryByTestId('todo-1')).not.toBeInTheDocument();
});


it("load from localStorage", function () {

    localStorage.setItem('todo-list', JSON.stringify({
        '1': {
            todo: 'test todo',
            id: '1'
        }
    }));

    const { asFragment, queryByTestId, queryByDisplayValue, queryByLabelText, queryByText, debug } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();

    expect(queryByTestId('todo-1')).toBeInTheDocument();

    localStorage.setItem('todo-list', '');
});