describe("Visit association page", () => {
  it("Login user", () => {
    cy.login({ email: "demo@demo.com", password: "test1234" });
  });
  it("Reach application endpoint", () => {
    cy.visit("/home");
  });
  it("Click on 'Association' menu link", () => {
    cy.get("[style='display: flex; flex-direction: row; justify-content: center;'] > :nth-child(2)").click();
  });
  it("Navigate to one Association", () => {
    cy.get(".MuiGrid-container > :nth-child(1)").click();
  });
  it("Should have a contact email address", () => {
    cy.get("button[width='100%']").parent().should('have.attr', 'href').and('include', 'mailto:');
  });
});
