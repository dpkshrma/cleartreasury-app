describe("Sign In", () => {
  beforeEach(function () {
    // cy.task("db:seed");

    // cy.loginByCognitoApi(Cypress.env("cognito_username"), Cypress.env("cognito_password"));
    cy.loginByCognitoApi(
      "test-users+rory_1626444065@clearcurrency.co.uk",
      "Testing123!"
    );
  });

  it("should allow a user to sign in", () => {
    cy.visit("/transfer");
  });
});
