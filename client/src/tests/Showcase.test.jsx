import React from 'react';
import { render } from '@testing-library/react';
import Showcase from '../components/Showcase';

describe('Showcase Component', () => {
    it('renders correctly', () => {
        const { getByText, getAllByAltText } = render(<Showcase />);
        
        // Check for the presence of text content
        expect(getByText("Add photos and maps")).toBeInTheDocument();
        expect(getByText("Share your Voyage!")).toBeInTheDocument();

        // Check for the presence of images
        const images = getAllByAltText("Product screenshot");
        expect(images.length).toBe(2);
    });
});
