describe('Login form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/#/login');
  });

  describe('should success when submit with', () => {
    it('valid given credentials', () => {
      cy.url().should('eq', 'http://localhost:5173/#/login');

      cy.get('#username').should('be.visible').type('admin');
      cy.get('#password').should('be.visible').type('admin');

      cy.get('.MuiButtonBase-root').click();

      cy.url().should('eq', 'http://localhost:5173/#/professionals');

      cy.get('.css-jp2pjq-RaUserMenu-root > .MuiButtonBase-root')
        .should('be.visible')
        .click();
      cy.get('.MuiPaper-root > .MuiList-root > .MuiButtonBase-root')
        .should('be.visible')
        .click();

      cy.url().should('eq', 'http://localhost:5173/#/login');
    });
  });

  describe('should display an error when submit with', () => {
    it('empty credentials', () => {
      cy.url().should('eq', 'http://localhost:5173/#/login');

      cy.get('.MuiSnackbar-root > .MuiPaper-root').should('not.exist');

      cy.get('.MuiButtonBase-root').click();

      cy.get('#username-helper-text')
        .should('be.visible')
        .should('contain', 'Required');

      cy.get('#password-helper-text')
        .should('be.visible')
        .should('contain', 'Required');

      cy.get('.MuiSnackbar-root > .MuiPaper-root')
        .should('be.visible')
        .should('contain', 'The form is not valid. Please check for errors');
    });

    it('empty username', () => {
      cy.url().should('eq', 'http://localhost:5173/#/login');

      cy.get('.MuiSnackbar-root > .MuiPaper-root').should('not.exist');

      cy.get('#password').should('be.visible').type('admin');

      cy.get('.MuiButtonBase-root').click();

      cy.get('#username-helper-text')
        .should('be.visible')
        .should('contain', 'Required');

      cy.get('.MuiSnackbar-root > .MuiPaper-root')
        .should('be.visible')
        .should('contain', 'The form is not valid. Please check for errors');
    });

    it('empty password', () => {
      cy.url().should('eq', 'http://localhost:5173/#/login');

      cy.get('.MuiSnackbar-root > .MuiPaper-root').should('not.exist');

      cy.get('#username').should('be.visible').type('admin');

      cy.get('.MuiButtonBase-root').click();

      cy.get('#password-helper-text')
        .should('be.visible')
        .should('contain', 'Required');

      cy.get('.MuiSnackbar-root > .MuiPaper-root')
        .should('be.visible')
        .should('contain', 'The form is not valid. Please check for errors');
    });

    it('invalid given credentials', () => {
      cy.url().should('eq', 'http://localhost:5173/#/login');

      cy.get('.MuiSnackbar-root > .MuiPaper-root').should('not.exist');

      cy.get('#username').should('be.visible').type('~&^%$#%!@^]/');
      cy.get('#password').should('be.visible').type('~&^%$#%!@^]/');

      cy.get('.MuiButtonBase-root').click();

      cy.get('.MuiSnackbar-root > .MuiPaper-root')
        .should('be.visible')
        .should('contain', 'Invalid username or password');
    });
  });
});
