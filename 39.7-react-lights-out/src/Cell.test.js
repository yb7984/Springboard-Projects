import React from "react";
import { render, asFragment } from "@testing-library/react";
import Cell from "./Cell";

it("renders without crashing", function () {
    render(<table><tbody><tr><Cell /></tr></tbody></table>);
});

it("matches snapshot", function () {
    const { asFragment } = render(<table><tbody><tr><Cell /></tr></tbody></table>);
    expect(asFragment()).toMatchSnapshot();
});


it("works when light is on", function () {
    const { asFragment, queryByTestId } = render(<table><tbody><tr><Cell isLit={true} cellId="1-1" /></tr></tbody></table>);
    
    expect(queryByTestId("1-1")).toHaveClass("Cell-lit");
});


it("works when light is off", function () {
    const { asFragment, queryByTestId } = render(<table><tbody><tr><Cell isLit={false} /></tr></tbody></table>);
    
    expect(queryByTestId("cell")).not.toHaveClass("Cell-lit");
});
