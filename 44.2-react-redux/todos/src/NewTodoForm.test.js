import { render, screen } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

it("renders without crashing", function () {
  render(<NewTodoForm />);
});


it("matches snapshot, show empty input", function () {
  const { asFragment , queryByLabelText} = render(<NewTodoForm />);
  expect(asFragment()).toMatchSnapshot();

  const inputTodo = queryByLabelText("New Todo:");

  expect(inputTodo).toBeInTheDocument();
  expect(inputTodo.value).toBe("");
});