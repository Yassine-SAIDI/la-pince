// ***********************************************
// This file defines custom commands for Cypress
// ***********************************************

Cypress.Commands.add("login", (email: string, password: string | undefined) => {
  // Si nous utilisons le stub d'authentification
  if (Cypress.env("STUB_AUTH")) {
    // Simuler un utilisateur authentifié
    cy.intercept("GET", "**/api/auth/**", {
      statusCode: 200,
      body: {
        user: {
          id: "test-user",
          email: email,
          name: "Test User",
        },
        isAuthenticated: true,
      },
    }).as("authCheck");

    // Simuler un token d'authentification
    cy.window().then((win) => {
      win.localStorage.setItem(
        "auth-session",
        JSON.stringify({
          token: "fake-token",
          user: { id: "test-user", email },
        })
      );
    });

    cy.visit("/dashboard");
    return;
  }

  // Méthode normale via l'interface utilisateur
  cy.visit("/sign-in");
  cy.get('input[name="email"]').type(email);
  if (typeof password !== 'string') {
    throw new Error('Password must be provided as a string for UI login.');
  }
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("setupApiIntercepts", () => {
  // Utiliser des URL relatives pour les interceptions
  cy.intercept("GET", "/api/transactions-history*", {
    statusCode: 200,
    body: {
      transactions: [
        {
          id: "1",
          amount: 100,
          formattedAmount: "100,00 €",
          description: "Test transaction",
          category: { name: "Test Category", color: "#ff0000" },
          date: new Date().toISOString(),
          type: "income",
        },
      ],
    },
  }).as("getTransactions");

  // Autres interceptions nécessaires
  cy.intercept("GET", "/api/stats/**", {
    statusCode: 200,
    body: {
      incomes: 1000,
      expenses: 500,
      balance: 500,
    },
  }).as("getStats");
});
