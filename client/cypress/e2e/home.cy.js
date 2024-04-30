describe('Home', () => {
  it('renders', () => {
    cy.visit('http://localhost:3000')
  })

    it('has a title', () => {
        cy.visit('http://localhost:3000')
        cy.get('h1').should('have.text', 'Begin your journey with Voyage.')
    })

    it('has a subtitle', () => {
        cy.visit('http://localhost:3000')
        cy.get('p').contains('Share your experience or read about others! Voyage is all about remembering those moments and being able to share those moments as well.');
    })

    it('has a CTA button', () => {
        cy.visit('http://localhost:3000')
        cy.get('button').should('contain', 'Start your journey')
    })

    it('has a login button', () => {
        cy.visit('http://localhost:3000')
        cy.get('button').should('contain', 'Login')
    })

    it('CTA button opens modal', () => {
        cy.visit('http://localhost:3000')
        cy.get('button').contains('Start your journey').click()
        cy.get('h4').should('contain', 'Login')
    })

    it('Don\'t have an account? Register button', () => {
        cy.visit('http://localhost:3000')
        cy.get('button').contains('Start your journey').click()
        cy.get('button').contains('Register').click()
        cy.get('h4').should('contain', 'Register')
    })

    it('Login button opens modal', () => {
        cy.visit('http://localhost:3000')
        cy.get('button').contains('Login').click()
        cy.get('h4').should('contain', 'Login')
    })

    it('after login, should show search bar', () => {
        cy.visit('http://localhost:3000')
        cy.get('button').contains('Login').click()
        cy.get('#username').type('test')
        cy.get('#password').type('123')
        cy.get('#login').click()
        cy.get('input').should('have.length', 1)
    })

    it('view journals button', () => {
        cy.visit('http://localhost:3000')
        cy.get('button').contains('Login').click()
        cy.get('#username').type('test')
        cy.get('#password').type('123')
        cy.get('#login').click()
        cy.get('a').contains('View Journals').click()
        cy.url().should('include', '/profile')
    });
})