import React from 'react';
import Registration from '../components/Registration';
import { render, screen } from '@testing-library/react';

// mock the axios
jest.mock('axios');

// mock the Zustand store
jest.mock('../resources/store', () => ({
    useStore: jest.fn(),
}));

describe('Login component', () => {
    it('should render the Registration form', () => {
        render(<Registration />);

        expect(screen.getByText('Already have an account?')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    //TODO: test switch to Register component when the register button is clicked
    // TODO: test login submission
});
