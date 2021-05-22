import ColorForm from './ColorForm';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

let colors = [
    {
        name: "Red",
        value: "#FF0000"
    }
];

//mock the addColor function
const addColor = (name, value) => {
    colors.push({
        name,
        value
    })
};

const resetColors = () => {
    colors = [
        {
            name: "Red",
            value: "#FF0000"
        }
    ];
}

let alertMsg = null;

window.alert = (msg) => {
    alertMsg = msg;
}


it('renders without crashing', () => {
    render(<MemoryRouter><ColorForm colors={colors} /></MemoryRouter>);
});


it("matches snapshot", function () {
    const { asFragment, queryByLabelText } = render(
        <MemoryRouter>
            <ColorForm colors={colors} />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(queryByLabelText('Color Name:')).toBeInTheDocument();
    expect(queryByLabelText('Color Value:')).toBeInTheDocument();
});


it("works with adding new color not in the list", function () {
    resetColors();

    const { queryByLabelText, queryByText } = render(
        <MemoryRouter>
            <ColorForm colors={colors} addColor={addColor} />
        </MemoryRouter>
    );

    const inputName = queryByLabelText('Color Name:');
    const inputValue = queryByLabelText('Color Value:');
    const btn = queryByText("Add Color!");
    fireEvent.change(inputName, { target: { value: "Blue" } });
    fireEvent.change(inputValue, { target: { value: "#0000ff" } });

    fireEvent.click(btn);

    expect(colors[1]).toEqual({ name: "Blue", value: "#0000ff" });
});


it("doesn't work with adding new color already in the list", function () {
    resetColors();

    const { queryByLabelText, queryByText } = render(
        <MemoryRouter>
            <ColorForm colors={colors} addColor={addColor} />
        </MemoryRouter>
    );

    const inputName = queryByLabelText('Color Name:');
    const inputValue = queryByLabelText('Color Value:');
    const btn = queryByText("Add Color!");
    fireEvent.change(inputName, { target: { value: "Red" } });
    fireEvent.change(inputValue, { target: { value: "#0000ff" } });

    fireEvent.click(btn);

    expect(colors[1]).toEqual(undefined);
    expect(alertMsg).toEqual("Color Name has been used, please choose another one!");

    alertMsg = "";
});

