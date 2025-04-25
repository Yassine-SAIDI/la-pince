// Stub d'authentification pour bypass la page de login dans les tests Cypress
Cypress.Commands.add("stubAuth", () => {
  // Simuler un utilisateur authentifié
  cy.intercept("/api/auth/**", {
    statusCode: 200,
    body: {
      user: {
        id: "test-user-id",
        email: "test@example.com",
        name: "Test User",
      },
      isAuthenticated: true,
    },
  });

  // Définir un cookie ou localStorage pour simuler l'état authentifié
  localStorage.setItem(
    "auth-token",
    JSON.stringify({
      token: "fake-auth-token",
      user: { id: "test-user-id", email: "test@example.com" },
    })
  );
});
