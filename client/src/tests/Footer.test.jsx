import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
    it('renders all navigation links', () => {
        render(<Footer />);

        // Find all links
        const instagramLink = screen.getByText('Instagram');
        const xLink = screen.getByText('X');
        const githubLink = screen.getByText('GitHub');
        const youtubeLink = screen.getByText('YouTube');

        // make sure all links are rendered
        expect(instagramLink).toBeInTheDocument();
        expect(xLink).toBeInTheDocument();
        expect(githubLink).toBeInTheDocument();
        expect(youtubeLink).toBeInTheDocument();
    });



    it('has correct copyright text', () => {
        render(<Footer />);

        const copyrightText = screen.getByText(/Voyage/i);
        expect(copyrightText).toBeInTheDocument();
    });
});