/// <reference types="cypress" />
export {};
import { mount } from 'cypress/react18';

// Augment the Cypress namespace to include type definitions for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;

      login: ({
        username,
        password,
      }: {
        username?: string;
        password?: string;
      }) => void;
    }
  }
}
