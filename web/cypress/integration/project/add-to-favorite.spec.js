describe("Add project to favorite", () => {
  it("Login user", () => {
    cy.login({ email: "demo@demo.com", password: "test1234" });
  });
  it("Reach application endpoint", () => {
    cy.visit("/home");
  });
  it("Click on project card", () => {
    cy.get(".MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2 >:nth-child(1)")
      .click();
  });
  it("Click on add to favorite button", () => {
    cy.get("div[width='40%'][height='40%']").next().find("button").first().click();
  });
  it("Should show success notification", () => {
    cy.get('#notistack-snackbar');
  });
  it("Click on remove from favorite button", () => {
    cy.get("div[width='40%'][height='40%']").next().find("button").first().click();
  });
  it("Should show success notification", () => {
    cy.get('#notistack-snackbar');
  });
});
