import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../components/Table';
import { BrowserRouter as Router } from 'react-router-dom';

const mockNavigate = jest.fn();
const mockDeleteJournalEntry = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('../resources/store', () => ({
    useStore: () => ({
        deleteJournalEntry: mockDeleteJournalEntry
    })
}));

const mockEntries = [
    { _id: '1', date: '2021-01-01', location: 'Location 1', title: 'Title 1', text: 'Description 1', isPublic: true, coverPhoto: 'travelPhoto1' },
    { _id: '2', date: '2021-01-02', location: 'Location 2', title: 'Title 2', text: 'Description 2', isPublic: false, coverPhoto: 'travelPhoto2' }
];

describe('Table Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockDeleteJournalEntry.mockClear();
    });

    it('renders without crashing', () => {
        render(<Router><Table entries={mockEntries} /></Router>);
        expect(screen.getByText('Journal Entries')).toBeInTheDocument();
        expect(screen.getAllByText(/Edit/).length).toBe(3);
    });
});
