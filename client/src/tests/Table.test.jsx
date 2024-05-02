import { render, fireEvent } from '@testing-library/react';
import Table from '../components/Table';
import { useStore } from '../resources/store';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../resources/store', () => ({
  useStore: jest.fn(),
}));

describe('Table component', () => {
    const mockConfirm = jest.fn();
  window.confirm = mockConfirm;

  beforeEach(() => {
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


            fireEvent.click(getByText('Delete'));

            expect(deleteJournalEntry).toHaveBeenCalledWith('1');
    });

  it('navigates to edit entry page when edit button is clicked', () => {
        const navigate = jest.fn();
        const entries = [
            { _id: '1', date: '2024-04-13', location: 'Test Location', title: 'Test Title', text: 'Test Text', isPublic: true },
        ];
        useNavigate.mockReturnValue(navigate);

        const { container } = render(<Table entries={entries} />);

        fireEvent.click(container.querySelector('.text-amber-500'));

        expect(navigate).toHaveBeenCalledWith('/edit-entry/1');
    });
});
