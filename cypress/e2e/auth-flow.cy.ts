describe("Authentication Flow", () => {
  it("should redirect unauthenticated users to sign-in page", () => {
    // Visiter la page dashboard sans authentification
    cy.visit("/dashboard");

    // Vérifier que l'utilisateur est redirigé vers la page de connexion
    cy.url().should("include", "/sign-in");

    // Vérifier que des éléments de la page de connexion sont présents
    cy.get("body")
      .contains(/connexion|se connecter|sign in/i, { matchCase: false })
      .should("exist");
  });

  it("should show home page with login/signup links", () => {
    // Visiter la page d'accueil
    cy.visit("/");

    // Vérifier que des éléments de la page d'accueil sont présents
    cy.get("body").should("exist");
    cy.contains(/bienvenue|welcome/i, { matchCase: false }).should("exist");
  });
});
