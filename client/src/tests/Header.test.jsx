import React from 'react';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useStore } from '../resources/store';

// mock the axios
jest.mock('axios');

// mock the Zustand store
jest.mock('../resources/store', () => ({
    useStore: jest.fn(),
}));

describe('Header Component', () => {
    // check if logo is rendered
    it('renders logo', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(screen.getByAltText('Voyage')).toBeInTheDocument();
    });

    // check if 'view journals' button is rendered when logged in
    it('renders login button', () => {
        useStore.mockImplementation(() => ({ loggedIn: true }));
        console.log(useStore()); // Debug: Check the mocked state
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(screen.getByRole('link', { name: /view journals/i })).toBeInTheDocument();
    });

    // check if 'login' button is rendered when not logged in TODO: currently not working and idk why...



});