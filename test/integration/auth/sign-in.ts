import jwt from "jsonwebtoken";

type Window = Cypress.AUTWindow & {
  msw: any;
};

describe("Sign In", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should allow a user to sign in", () => {
    cy.window().then((window: Window) => {
      const { worker, rest } = window.msw;

      const token = jwt.sign(
        {
          sub: "uuid",
          token_use: "access",
          scope: "aws.cognito.signin.user.admin",
          auth_time: Date.now(),
          exp: Date.now() + 3600,
          username: "uuid",
        },
        "secret"
      );

      worker.use(
        rest.post(
          "https://cognito-idp.eu-west-2.amazonaws.com/",
          (req, res, ctx) => {
            if (req.body.AuthFlow) {
              return res(
                ctx.status(200),
                ctx.json({
                  ChallengeName: "PASSWORD_VERIFIER",
                  ChallengeParameters: {
                    SALT: "",
                    SECRET_BLOCK: "",
                    SRP_B: "",
                    USERNAME: "uuid",
                    USER_ID_FOR_SRP: "uuid",
                  },
                })
              );
            }
            if (req.body.ChallengeName === "PASSWORD_VERIFIER") {
              return res(
                ctx.status(200),
                ctx.json({
                  ChallengeName: "SMS_MFA",
                  ChallengeParameters: {
                    CODE_DELIVERY_DELIVERY_MEDIUM: "SMS",
                    CODE_DELIVERY_DESTINATION: "+********0123",
                  },
                  Session: "",
                })
              );
            }
            if (req.body.ChallengeName === "SMS_MFA") {
              return res(
                ctx.status(200),
                ctx.json({
                  AuthenticationResult: {
                    AccessToken: token,
                    ExpiresIn: 3600,
                    IdToken: "???",
                    RefreshToken: "???",
                    TokenType: "Bearer",
                  },
                  ChallengeParameters: {},
                })
              );
            }
            if (req.body.AccessToken) {
              return res(
                ctx.status(200),
                ctx.json({
                  MFAOptions: [
                    {
                      AttributeName: "phone_number",
                      DeliveryMedium: "SMS",
                    },
                  ],
                  UserAttributes: [
                    {
                      Name: "sub",
                      Value: "uuid",
                    },
                    {
                      Name: "email_verified",
                      Value: "True",
                    },
                    {
                      Name: "phone_number_verified",
                      Value: "true",
                    },
                    {
                      Name: "phone_number",
                      Value: "+4400000001234",
                    },
                    {
                      Name: "email",
                      Value: "test-users+1626444065@clearcurrency.co.uk",
                    },
                  ],
                  Username: "uuid",
                })
              );
            }
          }
        )
      );

      worker.use(
        rest.post(
          "https://cognito-identity.eu-west-2.amazonaws.com/",
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({
                IdentityId: "eu-west-2:uuid",
              })
            );
          }
        )
      );
    });

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

    cy.findByLabelText(/Authentication code/i).type("123456");
    cy.findByRole("button", { name: /Sign in/i }).click();

    cy.findByText(/Which account/i).should("be.visible");
    // cy.findAllByRole("link").should("have.length", 2);
  });
});
