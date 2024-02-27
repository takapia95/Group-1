import React from 'react';
import Hero from '../components/Hero';
import { render, screen } from '@testing-library/react';
import {useStore} from "../resources/store";

// mock the axios
jest.mock('axios');

// mock the Zustand store
jest.mock('../resources/store', () => ({
    useStore: jest.fn(),
}));

// mock useNavigate
jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

describe('Hero Component', () => {
    it('renders the hero section', () => {
        render(<Hero />);

        // Find the heading
        const heading = screen.getByText('Begin your journey with');
        expect(heading).toBeInTheDocument();

        const span = screen.getByText('Voyage.');
        expect(span).toBeInTheDocument();
    });

    it('renders the start journey button', () => {
        render(<Hero />);

        // Find the button
        const button = screen.getByRole('link', { name: /start your journey/i });
        expect(button).toBeInTheDocument();
    });

    // render the search component when logged in TODO: HOW??!?!
});