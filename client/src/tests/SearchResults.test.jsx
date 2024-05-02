import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import SearchResults from '../components/SearchResults';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

import { useSearchParams } from '../customHooks';

jest.mock('../customHooks', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('../resources/store', () => ({
  useStore: {
    getState: () => ({
      search: jest.fn().mockResolvedValue([]), 
    }),
  },
}));

describe('SearchResults', () => {
  beforeEach(() => {
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
