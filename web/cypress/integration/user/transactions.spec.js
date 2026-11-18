describe("Get transactions list", () => {
  it("Login user", () => {
    cy.login({ email: "demo@demo.com", password: "test1234" });
  });
  it("Reach application endpoint", () => {
    cy.visit("/home");
  });
  it("Click on transaction menu link", () => {
    let userMenu = cy.get("button");
    userMenu.click();
    userMenu.next().children("button").first().next().next().click();
  });
  it("Check for transactions", () => {
    cy.get("[style='display: flex; width: 100%; flex-direction: column; overflow: hidden auto; place-content: center;']").children().should("have.length.gt", 0);
  });
});
