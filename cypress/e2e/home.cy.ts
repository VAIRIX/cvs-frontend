describe('home', () => {
  before(() => {
    cy.visit('http://localhost:5173/');
  });

  it('redirects to login', () => {
    cy.url().should('eq', 'http://localhost:5173/#/login');
  });
});
