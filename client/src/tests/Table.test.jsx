import { render, fireEvent } from '@testing-library/react';
import Table from '../components/Table';
import { useStore } from '../resources/store';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock the useStore hook
jest.mock('../resources/store', () => ({
  useStore: jest.fn(),
}));

describe('Table component', () => {
    const mockConfirm = jest.fn();
  window.confirm = mockConfirm;

  beforeEach(() => {
    // Reset mockConfirm before each test
    mockConfirm.mockClear();
  });

    it('calls deleteJournalEntry when delete button is clicked', () => {
            const deleteJournalEntry = jest.fn();
            const entries = [
            { _id: '1', date: '2024-04-13', location: 'Test Location', title: 'Test Title', text: 'Test Text', isPublic: true },
            ];
            useStore.mockReturnValue(deleteJournalEntry);

            const { getByText } = render(<Table entries={entries} />);

            mockConfirm.mockReturnValue(true);


            // Click the delete button
            fireEvent.click(getByText('Delete'));

            // Check if deleteJournalEntry is called with the correct argument
            expect(deleteJournalEntry).toHaveBeenCalledWith('1');
    });

  it('navigates to edit entry page when edit button is clicked', () => {
        const navigate = jest.fn();
        const entries = [
            { _id: '1', date: '2024-04-13', location: 'Test Location', title: 'Test Title', text: 'Test Text', isPublic: true },
        ];
        useNavigate.mockReturnValue(navigate);

        const { container } = render(<Table entries={entries} />);

        // Click the edit button with the unique class name
        fireEvent.click(container.querySelector('.text-amber-500'));

        // Check if navigate is called with the correct route
        expect(navigate).toHaveBeenCalledWith('/edit-entry/1');
    });
});
