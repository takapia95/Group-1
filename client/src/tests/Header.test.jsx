import React from 'react';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useStore } from '../resources/store';

jest.mock('axios');

jest.mock('../resources/store', () => ({
    useStore: jest.fn(),
}));

describe('Header Component', () => {
    it('renders logo', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(screen.getByAltText('Voyage')).toBeInTheDocument();
    });

    it('renders login button', () => {
        useStore.mockImplementation(() => ({ loggedIn: true }));
        console.log(useStore()); 
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(screen.getByRole('link', { name: /view journals/i })).toBeInTheDocument();
    });
});
