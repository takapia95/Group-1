import React from 'react';
import { render } from '@testing-library/react';
import Showcase from '../components/Showcase';

describe('Showcase Component', () => {
    it('renders correctly', () => {
        const { getByText, getAllByAltText } = render(<Showcase />);

        expect(getByText("Add photos and maps")).toBeInTheDocument();
        expect(getByText("Share your Voyage!")).toBeInTheDocument();

        const images = getAllByAltText("Product screenshot");
        expect(images.length).toBe(2);
    });
});
