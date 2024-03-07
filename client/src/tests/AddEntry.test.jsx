import React from 'react';
import AddEntry from '../components/AddEntry';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

// mock the axios
jest.mock('axios');

// mock the Zustand store
jest.mock('../resources/store', () => ({
    useStore: jest.fn(),
}));

describe('AddEntry Component', () => {
    it('renders the form component', () => {
        render(
            // wrap the component in a Router to be able to use the useNavigate hook
            <Router>
                <AddEntry />
            </Router>
        );

        // Find the form
        const form = screen.getByTestId('form');
        expect(form).toBeInTheDocument();
    });
});
