import React from 'react';
import Home from '../components/Home';
import { render, screen } from '@testing-library/react';

jest.mock('axios');

jest.mock('../resources/store', () => ({
    useStore: jest.fn(),
}));

describe('Home Component', () => {
    it('renders Hero and Showcase components', () => {
        render(<Home />);

        const hero = screen.getByText('Begin your journey with');
        const showcase = screen.getByText('Share your Voyage!');

        expect(hero).toBeInTheDocument();
        expect(showcase).toBeInTheDocument();
    });
});
