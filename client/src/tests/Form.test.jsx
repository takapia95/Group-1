import React from 'react';
import Form from '../components/Form';
import {act, render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

// mock the axios
jest.mock('axios');

// mock the Zustand store
jest.mock('../resources/store', () => ({
    useStore: () => ({
        addJournalEntry: jest.fn(),
    }),
}));


describe('Form Component', () => {
    it('renders all form fields', () => {
        render(
            <Router>
                <Form />
            </Router>
        );

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
        render(
            <Router>
                <Form />
            </Router>
        );
        const submitButton = screen.getByRole('button', { name: /save/i });
        expect(submitButton).toBeInTheDocument();
    });

    it('upon form submission, the form data is sent to the server', async () => {
        render(
            <Router>
                <Form />
            </Router>
        );

        // wrap the interactions in act because we are using async/await
        await act(async () => {
            await userEvent.type(screen.getByLabelText(/Title/i), 'My Title');
            await userEvent.type(screen.getByLabelText(/About/i), 'My About');
            await userEvent.click(screen.getByLabelText(/Yes/i));
            const submitButton = screen.getByRole('button', { name: /save/i });
            userEvent.click(submitButton);
        });

        // TODO: check if the form data is sent to the server
    });
});