import React from "react";
import { render, fireEvent, asFragment } from "@testing-library/react";
import Board from "./Board";

//make thae random just out put 0.2 and 0.8 one after another
let current = 0.8;

Math.random = () => {
    if (current === 0.8) {
        current = 0.8;
        return 0.2;
    }
    current = 0.2;
    return 0.2;
}

it("renders without crashing", function () {
    render(<Board />);
});


it("matches snapshot", function () {
    current = 0.8;
    const { asFragment } = render(<Board />);
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot , all lights off, show the win message", function () {
    const { asFragment, queryByText, queryByTestId } = render(<Board chanceLightStartsOn={0} />);
    expect(asFragment()).toMatchSnapshot();

    //show the win message
    expect(queryByText("You Won", { exact: false })).toBeInTheDocument();
    //not showing the board
    expect(queryByTestId("Board")).not.toBeInTheDocument();
});



it("matches snapshot , all lights on, show the board", function () {
    const { asFragment, queryByText, queryByTestId } = render(<Board chanceLightStartsOn={1} />);
    expect(asFragment()).toMatchSnapshot();

    //show the win message
    expect(queryByText("You Won", { exact: false })).not.toBeInTheDocument();
    //not showing the board
    expect(queryByTestId("Board")).toBeInTheDocument();

    //showing all light on
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            expect(queryByTestId(`${y}-${x}`)).toHaveClass("Cell-lit");
        }
    }
});


it("works when click a cell", function () {
    current = 0.8;
    const { asFragment, queryByText, queryByTestId } = render(<Board chanceLightStartsOn={1} />);

    //all lights on
    let clickCell = queryByTestId("2-2");
    for (let y = 1; y <= 3; y++) {
        for (let x = 1; x <= 3; x++) {
            expect(queryByTestId(`${y}-${x}`)).toHaveClass("Cell-lit");
        }
    }

    fireEvent.click(clickCell);

    //all light around it turn off, others stay on
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (y >= 1 && y <= 3 && x >= 1 && x <= 3) {
                expect(queryByTestId(`${y}-${x}`)).not.toHaveClass("Cell-lit");
            } else {
                expect(queryByTestId(`${y}-${x}`)).toHaveClass("Cell-lit");
            }
        }
    }

});
