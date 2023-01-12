/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', ({ username, password }) => {
  cy.url().should('eq', 'http://localhost:5173/#/login');

  if (username) {
    cy.get('#username').should('be.visible').type(username);
  }

  if (password) {
    cy.get('#password').should('be.visible').type(password);
  }

  cy.get('.MuiButtonBase-root').click();
});
