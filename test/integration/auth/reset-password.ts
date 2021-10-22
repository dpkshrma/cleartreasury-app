import mockData from "../../__mocks__/cognito";

const mockIntiatePasswordResetApi = (callback) => {
  cy.window().then((window: Window) => {
    const { worker, rest } = window.msw;
    worker.use(
      rest.post("https://cognito-idp.eu-west-2.amazonaws.com/", callback)
    );
  });
};

const generateResetCode = (email, passcode) => {
  return window.btoa(JSON.stringify({ email, passcode }));
};

describe("Reset Password", () => {
  it("should show success alert on send code button click", () => {
    cy.visit("/reset-password");
    mockIntiatePasswordResetApi((req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(mockData.cognitoIntiatePwdResetSuccess)
      );
    });
    cy.findByRole("textbox", { name: /email address/i }).type(
      mockData.cognitoUser.email
    );
    cy.findByRole("button", { name: /send code/i }).click();
    cy.findByTestId("code-sent-alert").should(
      "have.text",
      "Please check your email and follow the instructions in the message we have just sent to you."
    );
  });

  it("should show failure alert on send code button click", () => {
    cy.visit("/reset-password");
    mockIntiatePasswordResetApi((req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json(mockData.cognitoIntiatePwdResetFailure)
      );
    });
    cy.findByRole("textbox", { name: /email address/i }).type(
      mockData.cognitoUser.email
    );
    cy.findByRole("button", { name: /send code/i }).click();
    cy.findByTestId("page-alert").should(
      "have.text",
      mockData.cognitoIntiatePwdResetFailure.message
    );
  });

  it("should show failure alert for invalid password reset code", () => {
    cy.visit("/reset-password?code=invalid");
    cy.findByTestId("page-alert").should(
      "have.text",
      "Invalid reset password link"
    );
  });

  it("should show success alert on new password submit", () => {
    const code = generateResetCode(mockData.cognitoUser.email, "123456");
    cy.visit("/reset-password?code=" + code);
    cy.findByTestId("page-alert").should("not.exist");
    mockIntiatePasswordResetApi((req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    });
    cy.findByLabelText(/password/i).type(mockData.cognitoUserPassword);
    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByTestId("page-alert").should(
      "have.text",
      "Password succesfully updated"
    );
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.location("pathname", { timeout: 30000 }).should("equal", "/login");
  });

  it("should show failure alert on new password submit", () => {
    const code = generateResetCode(mockData.cognitoUser.email, "123456");
    cy.visit("/reset-password?code=" + code);
    cy.findByTestId("page-alert").should("not.exist");
    mockIntiatePasswordResetApi((req, res, ctx) => {
      return res(ctx.status(400), ctx.json(mockData.cognitoSubmitPwdFailure));
    });
    cy.findByLabelText(/password/i).type(mockData.cognitoUserPassword);
    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByTestId("page-alert").should(
      "have.text",
      mockData.cognitoSubmitPwdFailure.message
    );
  });
});
