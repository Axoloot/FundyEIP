describe("Donate to project", () => {
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
  it("Click on donate button", () => {
    cy.get("div[width='40%'][height='40%']").next().find("button").first().next().click();
  });
  it("Fill out amount input", () => {
    cy.get("input").clear().type("2");
  });
  it("Click on donate button", () => {
    cy.get("div[width='40%'][height='40%']").next().find("button").first().next().click();
  });
  it("Should show success notification", () => {
    cy.get('#notistack-snackbar');
  });
});
