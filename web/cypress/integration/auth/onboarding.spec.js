describe("Onboarding", () => {
  it("Login user", () => {
    cy.login({ email: "demo@demo.com", password: "test1234" });
  });
  it("Reach application endpoint", () => {
    cy.visit("/Onboarding");
  });
  it("Go through Onboarding stepper", () => {
    cy.get('#right-arrow > img').click();
    cy.get('#right-arrow > img').click();
    cy.get('a > button').click();
  });
  it("Should redirect user to home", () => {
    cy.location('pathname').should('eq', '/home');
  });
});
