import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, config) {
      // Implémenter les événements de nœud ici
      return config;
    },
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    experimentalStudio: true,
    experimentalSkipDomainInjection: null,
    excludeSpecPattern: [
      // Nous activons dashboard.cy.ts mais gardons user-flow.cy.ts désactivé
      // "**/dashboard.cy.ts", // Cette ligne est commentée pour activer le test
      "**/user-flow.cy.ts",
    ],
    // Désactiver la sécurité web pour permettre les mocks
    chromeWebSecurity: false,
    // Ajouter des variables d'environnement pour le testing
    env: {
      STUB_AUTH: true,
      // Définir des routes pour contourner l'authentification
      PUBLIC_ROUTES: ["/", "/login", "/register"],
      PROTECTED_ROUTES: ["/dashboard"],
      // Testing API credentials
      TEST_USER_EMAIL: "test@example.com",
      TEST_USER_PASSWORD: "password123",
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
  },
  env: {
    apiUrl: "http://localhost:3000/api",
  },
});
