describe('home', () => {
  before(() => {
    cy.visit('http://localhost:5173/');
  });

  it('passes a example test', () => {
    cy.url().should('eq', 'http://localhost:5173/#/professionals');
  });
});
