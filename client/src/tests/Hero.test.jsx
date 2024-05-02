import React from 'react';
import Hero from '../components/Hero';
import { render, screen } from '@testing-library/react';
import {useStore} from "../resources/store";

jest.mock('axios');

jest.mock('../resources/store', () => ({
    useStore: jest.fn(),
    loggedIn: false,
}));

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

describe('Hero Component', () => {
    it('renders the hero section', () => {
        render(<Hero />);

        const heading = screen.getByText('Begin your journey with');
        expect(heading).toBeInTheDocument();

        const span = screen.getByText('Voyage.');
        expect(span).toBeInTheDocument();
    });

    it('renders the start journey button', () => {
        render(<Hero />);

        const button = screen.getByRole('button', { name: /start your journey/i });
        expect(button).toBeInTheDocument();
    });

    it('renders the search component when logged in', () => {
        useStore.mockImplementation((state) => state.loggedIn = true);
        render(<Hero />);
        const search = screen.getByText('Search');
        expect(search).toBeInTheDocument();
    });
});
