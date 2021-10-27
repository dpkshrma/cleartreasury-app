import jwt from "jsonwebtoken";
import * as uuid from "uuid";
import mockData from "../../__mocks__/cognito";

describe("Sign In", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should allow a user to sign in", () => {
    cy.window().then((window: Window) => {
      const { worker, rest } = window.msw;

      const token = jwt.sign(
        {
          sub: mockData.cognitoUser.sub,
          token_use: "access",
          scope: "aws.cognito.signin.user.admin",
          auth_time: Date.now() / 1000,
          exp: Date.now() / 1000 + 3600,
          username: mockData.cognitoUser.sub,
        },
        "secret"
      );
      const accessToken = jwt.sign(
        {
          origin_jti: uuid.v4(),
          sub: uuid.v4(),
          event_id: uuid.v4(),
          token_use: "access",
          scope: "aws.cognito.signin.user.admin",
          iss: "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2",
          auth_time: Date.now() / 1000,
          exp: 1633441412,
          iat: 1633437812,
          jti: uuid.v4(),
          client_id: "ab1c23de4fg5678l90hijkl1m",
          username: uuid.v4(),
        },
        "secret"
      );

      worker.use(
        rest.post(
          "https://cognito-idp.eu-west-2.amazonaws.com/",
          (req, res, ctx) => {
            if (req.body.AuthFlow) {
              return res(ctx.status(200), ctx.json(mockData.cognitoAuthFlow));
            }
            if (req.body.ChallengeName === "PASSWORD_VERIFIER") {
              return res(
                ctx.status(200),
                ctx.json(mockData.cognitoPasswordVerifier)
              );
            }
            if (req.body.ChallengeName === "SMS_MFA") {
              return res(
                ctx.status(200),
                ctx.json({
                  AuthenticationResult: {
                    AccessToken: accessToken,
                    ExpiresIn: 3600,
                    IdToken: token,
                    RefreshToken: token,
                    TokenType: "Bearer",
                  },
                  ChallengeParameters: {},
                })
              );
            }
            if (req.body.AccessToken) {
              return res(ctx.status(200), ctx.json(mockData.cognitoUserInfo));
            }
          }
        )
      );

      worker.use(
        rest.post(
          "https://cognito-identity.eu-west-2.amazonaws.com/",
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(mockData.cognitoIdentity));
          }
        )
      );
    });

    cy.intercept("/_next/data/development/index.json", (req) => {
      delete req.headers["if-none-match"];
      return req.continue((res) => {
        if (res.body.pageProps) {
          res.body.pageProps.authenticated = true;
          res.body.pageProps.user = mockData.cognitoUser;
        }
      });
    });

    cy.location("pathname", { timeout: 30000 }).should("equal", "/login");

    cy.findByLabelText(/Email/i).type(mockData.cognitoUser.email);
    cy.findByLabelText(/Password/i).type(mockData.cognitoUserPassword);
    cy.findByRole("button", { name: /Sign in/i }).click();

    cy.location("pathname", { timeout: 30000 }).should(
      "equal",
      "/authenticate"
    );

    cy.findByLabelText(/Authentication code/i).type(
      mockData.cognitoMfaPasscode
    );
    cy.findByRole("button", { name: /Sign in/i }).click();

    cy.findByText(/Which account/i).should("be.visible");
    cy.findAllByRole("link").should("have.length", 2);
  });
});
