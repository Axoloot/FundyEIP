describe("Register new user", () => {
  const email = Cypress._.random(0, 1e6) + "@test.fr";

  it("Reach application endpoint", () => {
    cy.visit(Cypress.env("auth").register);
  });
  it("Fill out auth form and submit: email = " + email, () => {
    cy.get('[type="text"]').type(email);
    cy.get('[name="password"]').type("password123");
    cy.get('[name="confirm-password"]').type("password123");
    cy.get('[type="submit"]').click();
  });
  it("Fill out name form and submit", () => {
    cy.get('[name="firstname"]').type("John");
    cy.get('[name="lastname"]').type("Doe");
    cy.get('[type="submit"]').click();
  });
  it("Should redirect user to Onboarding", () => {
    cy.location('pathname').should('eq', '/Onboarding');
  });
});
