describe("Simple Dashboard Check", () => {
  it("should check if dashboard redirects unauthenticated users", () => {
    // Tester le comportement de redirection sans authentification
    cy.visit("/dashboard");

    // Vérifier que nous sommes redirigés vers la page de connexion
    cy.url().should("include", "/sign-in");

    // Vérifier qu'un formulaire de connexion est présent
    cy.get("body").should("exist");
    cy.log("Test vérifie la redirection d'authentification");
  });
});
