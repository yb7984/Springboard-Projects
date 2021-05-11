import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

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
    render(<App />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
});