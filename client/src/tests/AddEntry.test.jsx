import React from 'react';
import AddEntry from '../components/AddEntry';
import { render, screen } from '@testing-library/react';

// mock the axios
jest.mock('axios');

// mock the Zustand store
jest.mock('../resources/store', () => ({
    useStore: jest.fn(),
}));

describe('AddEntry Component', () => {
    it('renders the form component', () => {
        render(<AddEntry />);

        // Find the form
        const form = screen.getByTestId('form');
        expect(form).toBeInTheDocument();
    });
});