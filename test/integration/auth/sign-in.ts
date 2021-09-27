describe("Sign In", () => {
  it("should allow a user to sign in", () => {
    cy.visit("/");

    cy.location("pathname").should("equal", "/login");

    cy.findByLabelText(/Email/i).type(
      "test-users+rory_1626444065@clearcurrency.co.uk"
    );
    cy.findByLabelText(/Password/i).type("Testing123!");
    cy.findByRole("button", { name: /Sign in/i }).click();

    cy.location("pathname", { timeout: 30000 }).should(
      "equal",
      "/authenticate"
    );

    cy.findByLabelText(/Authentication code/i).should("be.visible");

    // TODO: Mock the cognito mfa step and complete the authenticate form
  });
});
