/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Connecte un utilisateur soit via l'interface utilisateur soit en simulant une session
     * @example cy.login('user@example.com', 'password123')
     */
    login(email: string, password?: string): Chainable<void>;

    /**
     * Configure les interceptions API pour les tests
     * @example cy.setupApiIntercepts()
     */
    setupApiIntercepts(): Chainable<void>;
  }
}
