describe('Logged in tests', () => {
    beforeEach('should login', () => {
        cy.visit('http://localhost:3000')
        cy.get('button').contains('Login').click()
        cy.get('#username').type('test')
        cy.get('#password').type('123')
        cy.get('#login').click()
    });

    it('add new journal takes to search', () => {
        cy.get('a').contains('View Journals').click()
        cy.get('input').should('have.length', 0);
    });

    it('searching with query should navigate to results page', () => {
        cy.get('#search').type('test{enter}');
        cy.url().should('include', '/results?searchQuery=test');
    });

    it('add new journal starts new journal', () => {
        cy.get('a').contains('View Journals').click()
        cy.get('button').contains('Start Journaling').click()
        cy.get('input').should('have.length', 1);
    });

    it('add new journal entry', () => {
        cy.get('#search').type('test{enter}');
        cy.url().should('include', '/results?searchQuery=test');
        cy.get('h4').contains('Test Track').click();
        cy.url().should('include', '/location/');
        cy.get('button').contains('Add Journal Entry').click()
        cy.url().should('include', '/add-entry');

        cy.get('#title').type('Test Title');
        cy.get('#about').type('Test Content');
        cy.get('button').contains('Save').click();
        cy.get('table').should('have.length', 1);
    });

    it('should edit journal entry', () => {
        cy.get('a').contains('View Journals').click()
        cy.get('button').contains('Edit').click();
        cy.get('#title').type(' Edited');
        cy.get('#about').type(' Edited');
        cy.get('#no').check();
        cy.get('button').contains('Save').click();
        cy.get('table').should('have.length', 1);
    });


    it('delete journal entry', () => {
        cy.get('a').contains('View Journals').click()
        cy.get('button').contains('Delete').click();
        cy.get('table').should('have.length', 0);
    });

});