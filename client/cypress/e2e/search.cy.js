describe('Logged in tests', () => {
    beforeEach('should login', () => {
        cy.visit('http://localhost:3000')
        cy.get('button').contains('Login').click()
        cy.get('#username').type('test')
        cy.get('#password').type('123')
        cy.get('#login').click()
    });

    it('after login, should show search bar', () => {
        cy.get('input').should('have.length', 1);
    });

    it('search bar should have placeholder', () => {
        cy.get('input').should('have.attr', 'placeholder', 'Places to go, things to do...');
    });

    it('search bar should have a button', () => {
        cy.get('button').should('have.text', 'Search');
    });

    it('searching with query should navigate to results page', () => {
        cy.get('#search').type('test{enter}');
        cy.url().should('include', '/results?searchQuery=test');
    });

    it('clicking on logo should navigate to location details page', () => {
        cy.get('#search').type('test{enter}');
        cy.url().should('include', '/results?searchQuery=test');
        cy.get('h4').contains('Test Track').click();
        cy.url().should('include', '/location/');
    });
});
