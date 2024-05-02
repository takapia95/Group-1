import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from '../components/Error';

test('renders Error component', () => {
  render(<Error />);
  
  const logoElement = screen.getByAltText('Voyage');
  expect(logoElement).toBeInTheDocument();

  const errorMessageElement = screen.getByText(/This page does not exist/i);
  expect(errorMessageElement).toBeInTheDocument();

  const backToHomeLink = screen.getByText(/Back to home/i);
  expect(backToHomeLink).toBeInTheDocument();
  expect(backToHomeLink.getAttribute('href')).toBe('/#'); 
});
