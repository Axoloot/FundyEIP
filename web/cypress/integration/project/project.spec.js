describe("Visit project page", () => {
  it("Login user", () => {
    cy.login({ email: "demo@demo.com", password: "test1234" });
  });
  it("Reach application endpoint", () => {
    cy.visit("/home");
  });
  it("Click on project card", () => {
    cy.get('.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2 >:nth-child(1)')
      .click();
  });
  it("Should redirect user to project", () => {
    cy.location('pathname').should('include', '/Project/');
  });
});
