import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Color from './Color';

const colors = [
    {
        name: "Red",
        value: "#FF0000"
    }
];

const params = {
    colorName: "Red"
};

//mock the useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => params
}));

it('renders without crashing', () => {
    render(<MemoryRouter><Color colors={colors} /></MemoryRouter>);
});


it("matches snapshot, works with the colorName in colors", function () {
    params.colorName = "Red";
    
    const { asFragment, queryByText } = render(
        <MemoryRouter>
            <Color colors={colors} />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(queryByText('This is Red')).toBeInTheDocument();
});


it("matches snapshot, works with the colorName not in colors", function () {
    params.colorName = "Blue";
    
    const { asFragment, queryByText } = render(
        <MemoryRouter>
            <Color colors={colors} />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(queryByText('This is Red')).not.toBeInTheDocument();
});