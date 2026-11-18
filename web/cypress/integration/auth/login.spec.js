describe("Login user", () => {
  it("Reach application endpoint", () => {
    cy.visit(Cypress.env("auth").login);
  });
  it("Fill out auth form and submit", () => {
    cy.get('[type="text"]').clear().type("demo@demo.com");
    cy.get('[name="password"]').clear().type("test1234");
    cy.get('[name="login"]').children().last().click();
  });
  it("Should redirect user to Home", () => {
    cy.location('pathname').should('eq', '/Home');
  });
});
