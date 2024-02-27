import React from 'react';
import Form from '../components/Form';
import {fireEvent, act, render, screen} from '@testing-library/react';
import { useStore } from '../resources/store';
import userEvent from "@testing-library/user-event";

// mock the axios
jest.mock('axios');

// mock the Zustand store
jest.mock('../resources/store', () => ({
    useStore: jest.fn(),
}));

describe('Form Component', () => {
    it('renders all form fields', () => {
        render(<Form />);

        // Find all form fields
        const titleField = screen.getByLabelText(/Title/i);
        const aboutField = screen.getByLabelText(/About/i);
        const coverPhotoField = screen.getByLabelText(/Upload a file/i);
        const yesRadio = screen.getByLabelText(/Yes/i);
        const noRadio = screen.getByLabelText(/No/i);

        // make sure all form fields are rendered
        expect(titleField).toBeInTheDocument();
        expect(aboutField).toBeInTheDocument();
        expect(coverPhotoField).toBeInTheDocument();
        expect(yesRadio).toBeInTheDocument();
        expect(noRadio).toBeInTheDocument();
    });

    it('renders submit button', () => {
        render(<Form />);
        const submitButton = screen.getByRole('button', { name: /save/i });
        expect(submitButton).toBeInTheDocument();
    });

    it('upon form submission, the form data is sent to the server', async () => {
        const addJournalEntryMock = jest.fn();

        // Mock the store to include loggedIn state and a mock addJournalEntry method
        useStore.mockImplementation(() => ({
            addJournalEntry: addJournalEntryMock,
        }));

        render(<Form />);

        // Simulate user input
        const titleField = screen.getByLabelText(/Title/i);
        const aboutField = screen.getByLabelText(/About/i);
        const yesRadio = screen.getByLabelText(/Yes/i);

        await userEvent.type(titleField, 'My Title');
        await userEvent.type(aboutField, 'My About');
        await userEvent.click(yesRadio);

        // simulate form submission
        const submitButton = screen.getByRole('button', { name: /save/i });
        // if it changes state, it has to be wrapped in act
        act(() => {
            // Simulate events that update state here
            fireEvent.click(submitButton);
        });

        // check if addJournalEntry was called with the correct data
        expect(addJournalEntryMock).toHaveBeenCalledWith({
            title: 'My Title',
            about: 'My About',
        });
    });
});