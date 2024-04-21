import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from '../components/Error';

test('renders Error component', () => {
  render(<Error />);
  
  // Check if the logo is rendered
  const logoElement = screen.getByAltText('Voyage');
  expect(logoElement).toBeInTheDocument();

  // Check if the error message is rendered
  const errorMessageElement = screen.getByText(/This page does not exist/i);
  expect(errorMessageElement).toBeInTheDocument();

  // Check if the back to home link is rendered
  const backToHomeLink = screen.getByText(/Back to home/i);
  expect(backToHomeLink).toBeInTheDocument();
  expect(backToHomeLink.getAttribute('href')).toBe('/#'); // Ensure the link has the correct href attribute
});
