describe("Edit profil", () => {
  it("Login user", () => {
    cy.login({ email: "demo@demo.com", password: "test1234" });
  });
  it("Reach application endpoint", () => {
    cy.visit("/home");
  });
  it("Open user's profil", () => {
    let userMenu = cy.get("button");
    userMenu.click();
    userMenu.next().children("button").first().click();
    cy.location("pathname").should("eq", "/EditProfil");
  });
  it("Check user's informations", () => {
    cy.get("[name='email']").should("have.value", "demo@demo.com");
    cy.get("[name='firstname']").should("have.value", "firstname_test");
    cy.get("[name='lastname']").should("have.value", "lastname_test");
  });
});
