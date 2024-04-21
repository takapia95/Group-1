import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../components/Loading';

test('renders loading component with loading GIF', () => {
  render(<Loading />);
  const loadingImage = screen.getByAltText('Loading...');
  expect(loadingImage).toBeInTheDocument();
});
