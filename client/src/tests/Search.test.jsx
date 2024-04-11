import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from '../components/Search';

// Mocking the react-router-dom's useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mocking the useStore hook
jest.mock('../resources/store', () => ({
  useStore: jest.fn(),
}));

describe('Search component', () => {
  test('renders without crashing', () => {
    render(<Search />);
  });

  test('search button invokes handleSearch function', () => {
    const { getByText, getByPlaceholderText } = render(<Search />);
    const searchButton = getByText('Search');
    const searchInput = getByPlaceholderText('Places to go, things to do...');

    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    fireEvent.change(searchInput, { target: { value: 'test query' } });
    fireEvent.click(searchButton);
  
  });
});
