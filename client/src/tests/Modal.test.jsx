import React from 'react';
import '@testing-library/jest-dom';
import Modal from '../components/Modal';
import { render, screen, fireEvent } from '@testing-library/react';
import { useStore } from '../resources/store';

// mock the Zustand store
jest.mock('../resources/store', () => ({
    useStore: jest.fn(),
}));

describe('Modal Component', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        // reset mock function's state
        mockOnClose.mockReset();
    });

    it('renders Login content by default when open', () => {
        useStore.mockImplementation(() => ({ modalContent: '' }));
        render(<Modal isOpen={true} onClose={mockOnClose} />);
        // Check that the login button is rendered
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('renders Login content when set to login and open', () => {
        useStore.mockImplementation(() => ({ modalContent: 'login' }));
        render(<Modal isOpen={true} onClose={mockOnClose} />);
        // Check that the login button is rendered
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('renders Registration content when set to register and open', () => {
        useStore.mockImplementation(() => ({ modalContent: 'register' }));
        render(<Modal isOpen={true} onClose={mockOnClose} />);
        // Check that the register button is rendered
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
        render(<Modal isOpen={false} onClose={mockOnClose} />);
        expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/register/i)).not.toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', () => {
        useStore.mockImplementation(() => ({ modalContent: 'login' }));
        render(<Modal isOpen={true} onClose={mockOnClose} />);
        fireEvent.click(screen.getByTestId('close-button'));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});
