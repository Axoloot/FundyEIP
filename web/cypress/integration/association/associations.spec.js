describe("Visit associations list", () => {
  it("Login user", () => {
    cy.login({ email: "demo@demo.com", password: "test1234" });
  });
  it("Reach application endpoint", () => {
    cy.visit("/home");
  });
  it("Click on 'Association' menu link", () => {
    cy.get("[style='display: flex; flex-direction: row; justify-content: center;'] > :nth-child(2)").click();
  });
  it("Should display multiple Associations", () => {
    cy.get(".MuiGrid-container").children().should("have.length.gt", 0);
  });
});
