describe("User Flow", () => {
  it("allows a user to sign up, log in, and view the dashboard", () => {
    cy.visit("/sign-up");

    // Sign up
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Log in
    cy.visit("/sign-in");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Verify dashboard
    cy.url().should("include", "/dashboard");
    cy.contains("Welcome to your dashboard").should("be.visible");
  });
});
