import React from 'react';
import Home from '../components/Home';
import { render, screen } from '@testing-library/react';

// mock the axios
jest.mock('axios');

// mock the Zustand store
jest.mock('../resources/store', () => ({
    useStore: jest.fn(),
}));

describe('Home Component', () => {
    it('renders Hero and Showcase components', () => {
        render(<Home />);

        // Find all components
        const hero = screen.getByText('Begin your journey with');
        const showcase = screen.getByText('Share your Voyage!');

        // make sure all components are rendered
        expect(hero).toBeInTheDocument();
        expect(showcase).toBeInTheDocument();
    });
});