import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import SearchResults from '../components/SearchResults';

// Mock the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Import the custom useSearchParams hook
import { useSearchParams } from '../customHooks';

// Mock the useSearchParams hook with the custom implementation
jest.mock('../customHooks', () => ({
  useSearchParams: jest.fn(),
}));

// Mock the useStore hook
jest.mock('../resources/store', () => ({
  useStore: {
    getState: () => ({
      search: jest.fn().mockResolvedValue([]), // Mock the search function to return an empty array
    }),
  },
}));

describe('SearchResults', () => {
  beforeEach(() => {
    // Reset the mock implementation of useSearchParams before each test
    useSearchParams.mockReturnValue({
      get: jest.fn(),
      set: jest.fn(),
    });
  });

  it('renders "No results found" message initially', () => {
    const { getByText } = render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );
    const noResultsMessage = getByText('No results found.');
    expect(noResultsMessage).toBeInTheDocument();
  });  

  it('handles filter button click', () => {
    const { getByText } = render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );
    fireEvent.click(getByText('Hotels'));
  });

  it('handles location button click', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );
    await waitFor(() => {
      fireEvent.click(getByText('Hotels'));
    });
  });

  it('handles location button click', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );
    await waitFor(() => {
      fireEvent.click(getByText('Restaurants'));
    });
  });

  it('handles location button click', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );
    await waitFor(() => {
      fireEvent.click(getByText('Attractions'));
    });
  });

  it('handles location button click', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );
    await waitFor(() => {
      fireEvent.click(getByText('Geos'));
    });
  });
});
