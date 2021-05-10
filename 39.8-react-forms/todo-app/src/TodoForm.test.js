import { render, screen } from '@testing-library/react';
import TodoForm from './TodoForm';

it("renders without crashing", function () {
    render(<TodoForm />);
});

it("matches snapshot, show empty input", function () {
    const { asFragment, queryByLabelText } = render(<TodoForm />);
    expect(asFragment()).toMatchSnapshot();

    const inputTodo = queryByLabelText("New Todo:");

    expect(inputTodo).toBeInTheDocument();
    expect(inputTodo.value).toBe("");
});


it("matches snapshot, show empty input when for edit", function () {
    const { asFragment, queryByLabelText } = render(<TodoForm id="1" todo="test todo" />);
    expect(asFragment()).toMatchSnapshot();

    const inputTodo = queryByLabelText("Edit Todo:");

    expect(inputTodo).toBeInTheDocument();
    expect(inputTodo.value).toBe("test todo");
});