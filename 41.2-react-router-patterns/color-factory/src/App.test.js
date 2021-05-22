import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';


let alertMsg = null;

window.alert = (msg) => {
  alertMsg = msg;
}

it('renders without crashing', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
});

it("matches snapshot", function () {
  const { asFragment } = render(<MemoryRouter><App /></MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});


it("matches snapshot, /colors", function () {
  const { asFragment, queryByText } = render(
    <MemoryRouter initialEntries={["/colors"]}>
      <App />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();

  expect(queryByText('Red')).toBeInTheDocument();
  expect(queryByText('Add a color')).toBeInTheDocument();
});



it("matches snapshot, /colors/Red", function () {
  const { asFragment, queryByText } = render(
    <MemoryRouter initialEntries={["/colors/Red"]}>
      <App />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  expect(queryByText('This is Red')).toBeInTheDocument();
});


it("matches snapshot, /colors/Blue, redirect to /colors", function () {
  const { asFragment, queryByText, debug } = render(
    <MemoryRouter initialEntries={["/colors/Blue"]}>
      <App />
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();

  expect(queryByText('This is Blue')).not.toBeInTheDocument();
  expect(queryByText('Red')).toBeInTheDocument();
  expect(queryByText('Add a color')).toBeInTheDocument();
});

it("matches snapshot, /colors/new", function () {
  const { asFragment, queryByLabelText } = render(
    <MemoryRouter initialEntries={["/colors/new"]}>
      <App />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();

  expect(queryByLabelText('Color Name:')).toBeInTheDocument();
  expect(queryByLabelText('Color Value:')).toBeInTheDocument();
});



it("/colors, works with the link to color", function () {
  const { queryByText } = render(
    <MemoryRouter initialEntries={["/colors"]}>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(queryByText('Red'));

  expect(queryByText('Red')).not.toBeInTheDocument();
  expect(queryByText("This is Red")).toBeInTheDocument();

  fireEvent.click(queryByText('Go back!'));

  //works with go back link
  expect(queryByText("Red")).toBeInTheDocument();
});


it("/colors, works with the link to new color", function () {
  const { queryByText, queryByLabelText } = render(
    <MemoryRouter initialEntries={["/colors"]}>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(queryByText('Add a color'));

  expect(queryByText('Add a color')).not.toBeInTheDocument();
  expect(queryByLabelText("Color Name:")).toBeInTheDocument();

  fireEvent.click(queryByText('Go back!'));

  //works with go back link
  expect(queryByText("Red")).toBeInTheDocument();


  fireEvent.click(queryByText('Add a color'));

  fireEvent.change(queryByLabelText('Color Name:'), { target: { value: "Blue" } });
  fireEvent.change(queryByLabelText('Color Value:'), { target: { value: "#0000ff" } });

  fireEvent.click(queryByText("Add Color!"));

  //Blue is list
  expect(queryByText("Blue")).toBeInTheDocument();


  // not works when the color already list
  fireEvent.click(queryByText('Add a color'));

  fireEvent.change(queryByLabelText('Color Name:'), { target: { value: "Blue" } });
  fireEvent.change(queryByLabelText('Color Value:'), { target: { value: "#0000ff" } });

  expect(alertMsg).toEqual(null);

  fireEvent.click(queryByText("Add Color!"));

  //show alert message and stay with the form
  expect(alertMsg).toEqual("Color Name has been used, please choose another one!");

  expect(queryByLabelText('Color Name:')).toBeInTheDocument();
});