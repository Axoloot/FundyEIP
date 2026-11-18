describe("Visit favorite projects page", () => {
  it("Login user", () => {
    cy.login({ email: "demo@demo.com", password: "test1234" });
  });
  it("Reach application endpoint", () => {
    cy.visit("/home");
  });
  it("Click on 'Favorite' menu link", () => {
    cy.get("[style='display: flex; flex-direction: row; justify-content: center;'] > :nth-child(3)").click();
  });
  it("Should display at least one project", () => {
    cy.get(".MuiGrid-container").children().should("have.length.gt", 0);
  });
});
