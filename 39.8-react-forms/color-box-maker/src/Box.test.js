import { render } from '@testing-library/react';
import Box from "./Box";

it("renders without crashing", function () {
    render(<Box id="test" width="100" height="100" color="#000000" />);
});


it("matches snapshot, have certain style", function () {
    const { asFragment, queryByTestId } = render(<Box id="test" width="100" height="100" color="#000000" />);
    expect(asFragment()).toMatchSnapshot();

    expect(queryByTestId("test")).toHaveStyle({
        width: "100px",
        height: "100px",
        backgroundColor: "#000000"
    });

});
