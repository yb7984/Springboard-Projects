import { render, fireEvent } from '@testing-library/react';
import BoxList from "./BoxList";
import { v4 as uuidv4 } from 'uuid';

//mock the uuid
jest.mock('uuid', () => {
    return {
        v4: () => "1"
    };
});

it("renders without crashing", function () {
    render(<BoxList />);
});


it("matches snapshot", function () {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});


it("works when click add box button, works when click the delete button", function () {

    const { queryByText, queryByPlaceholderText, queryByTestId, debug } = render(<BoxList />);

    const inputColor = queryByPlaceholderText("Color of the box");
    const inputWidth = queryByPlaceholderText("Width of the box");
    const inputHeight = queryByPlaceholderText("Height of the box");

    const button = queryByText('Add Box');

    expect(inputColor).toBeInTheDocument();
    expect(inputWidth).toBeInTheDocument();
    expect(inputHeight).toBeInTheDocument();

    fireEvent.change(inputColor, { target: { value: '#0f0f0f' } });
    fireEvent.change(inputHeight, { target: { value: 200 } });
    fireEvent.change(inputWidth, { target: { value: 100 } });

    expect(inputColor.value).toEqual('#0f0f0f');
    expect(inputHeight.value).toEqual('200');
    expect(inputWidth.value).toEqual('100');

    const testId = uuidv4();

    expect(queryByTestId(testId)).not.toBeInTheDocument();
    expect(queryByTestId(`del-${testId}`)).not.toBeInTheDocument();

    fireEvent.click(button);

    debug();

    // clear the form value
    expect(inputColor.value).toBe('#000000');
    expect(inputHeight.value).toBe('');
    expect(inputWidth.value).toBe('');

    expect(queryByTestId(testId)).toBeInTheDocument();
    expect(queryByTestId(`del-${testId}`)).toBeInTheDocument();

    const box = queryByTestId(testId);

    expect(box).toHaveStyle("background-color: #0F0F0F");
    expect(box).toHaveStyle("width: 100px;");
    expect(box).toHaveStyle("height: 200px;");

    //click the delete button
    fireEvent.click(queryByTestId(`del-${testId}`));

    expect(queryByTestId(testId)).not.toBeInTheDocument();
    expect(queryByTestId(`del-${testId}`)).not.toBeInTheDocument();

});

