import { render, screen } from '@testing-library/react';
import Todo from './Todo';

it("renders without crashing", function () {
  render(<Todo 
    todo="test" 
    isCompleted={false}
    id="1" />);
});


it("matches snapshot", function () {
  const { asFragment } = render(<Todo />);
  expect(asFragment()).toMatchSnapshot();
});