describe("Transfer Page", () => {
  it("should render the transfer page", () => {
    cy.authVisit("/transfer");
    cy.findAllByText("Make a transfer").should("be.visible");
  });
});
