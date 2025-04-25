describe("Tests basiques sans authentification", () => {
  it("devrait accéder à la page d'accueil", () => {
    cy.visit("/");
    // Vérifier que certains éléments de base sont présents
    // Adapter selon la structure réelle de votre page d'accueil
    cy.get("body").should("exist");
  });

  it("devrait rediriger vers la page de connexion pour les routes protégées", () => {
    cy.visit("/dashboard");
    // Si l'app utilise Clerk ou un autre système d'auth,
    // elle redirige probablement vers une page de connexion
    cy.url().should("not.include", "/dashboard");
  });
});
