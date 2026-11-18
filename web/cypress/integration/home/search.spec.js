describe("Search for project on home page", () => {
  it("Login user", () => {
    cy.login({ email: "demo@demo.com", password: "test1234" });
  });
  it("Reach application endpoint", () => {
    cy.visit("/home");
  });
  it("Input search text", () => {
    cy.get('[type="text"]').clear().type("sport");
  });
  it("Should show one result", () => {
    cy.get('.MuiGrid-container > .MuiGrid-root');
  });
});
