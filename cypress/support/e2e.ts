// ***********************************************************
// This file is processed and loaded automatically before your e2e tests
// ***********************************************************

// Import des commandes cypress
import "./commands";

// Import des commandes testing-library
import "@testing-library/cypress/add-commands";

// Ignorer les exceptions non gérées pour éviter les échecs de test
Cypress.on("uncaught:exception", () => {
  // Retourne false pour empêcher Cypress de faire échouer le test
  return false;
});
