import ColorList from './ColorList';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

const colors = [
    {
        name: "Red",
        value: "#FF0000"
    }
];


it('renders without crashing', () => {
    render(<MemoryRouter><ColorList colors={colors} /></MemoryRouter>);
});


it("matches snapshot", function () {
    const { asFragment, queryByText } = render(
        <MemoryRouter>
            <ColorList colors={colors} />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(queryByText('Add a color')).toBeInTheDocument();
    expect(queryByText('Red')).toBeInTheDocument();
});
