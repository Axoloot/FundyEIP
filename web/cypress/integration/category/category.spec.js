describe("Visit category page", () => {
  it("Login user", () => {
    cy.login({ email: "demo@demo.com", password: "test1234" });
  });
  it("Reach application endpoint", () => {
    cy.visit("/home");
  });
  it("Click on first category card", () => {
    cy.get('.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-4 >:nth-child(1)')
      .click();
  });
  it("Should show no results", () => {
    cy.get('[style="display: flex; height: 500px; width: 500px; place-self: center; margin-top: 25%; flex-direction: column;"] > div');
  });
  it("Reach application endpoint", () => {
    cy.visit("/home");
  });
  it("Click on third category card", () => {
    cy.get('.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-4 >:nth-child(3)')
      .click();
  });
  it("Should show one result", () => {
    cy.get('.MuiGrid-container > .MuiGrid-root');
  });
});
