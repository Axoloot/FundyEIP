describe("Switch to dark theme", () => {
  it("Login user", () => {
    cy.login({ email: "demo@demo.com", password: "test1234" });
  });
  it("Reach application endpoint", () => {
    cy.visit("/home");
  });
  it("Open switch to dark theme", () => {
    let userMenu = cy.get("button");
    userMenu.click();
    userMenu.next().children("button").first().next().click();
  });
  it("Verify background color", () => {
    cy.get("body")
      .should('have.css', 'background-color').and('eq', 'rgb(18, 22, 32)');
  });
});
