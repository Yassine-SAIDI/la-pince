// Support pour le mock de Clerk
export const setupClerkMock = () => {
  // Mock des routes Clerk API avec des chemins relatifs corrects
  cy.intercept("GET", "/api/clerk/**", {
    statusCode: 200,
    body: { success: true },
  }).as("clerkAPI");

  // Mock de la session avec des chemins relatifs corrects
  cy.intercept("GET", "/api/auth/session", {
    statusCode: 200,
    body: {
      session: {
        id: "test-session",
        userId: "user_123456789",
      },
    },
  }).as("clerkSession");
};
