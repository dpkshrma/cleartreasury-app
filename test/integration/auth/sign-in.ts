import jwt from "jsonwebtoken";

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
                    SALT: "KtUod66Bf",
                    SECRET_BLOCK: "71uCgBfwD",
                    SRP_B: "ujD_NNRbW",
                    USERNAME: "158jNELVw",
                    USER_ID_FOR_SRP: "8F8bT1xX6",
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
                    AccessToken:
                      "eyJraWQiOiJvV3NoTkR0Y3NONStmM1NGaWEwNDBLcUh5QXZcL2c0dk1tdU5ZWFdoT2F4UT0iLCJhbGciOiJSUzI1NiJ9.eyJvcmlnaW5fanRpIjoiMTViODRhMTQtODhlMy00MDg5LTg1MTMtMTgwY2JlNWUwODFiIiwic3ViIjoiMTVmYTQ1OWEtYzllYy00NmRhLTgwM2UtMWY2NzI5MjdlMGUyIiwiZXZlbnRfaWQiOiI2M2Y2NjgwZS03YmI2LTQ3YjItODNlMy00ZDNiMzk4NDY1MWYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjMzNDM3ODEyLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9ySGs1TkFzTFYiLCJleHAiOjE2MzM0NDE0MTIsImlhdCI6MTYzMzQzNzgxMiwianRpIjoiZDlhZTVlNWQtZmExZi00NTUyLTgxZWItZjdkNjdjYjIxMWNhIiwiY2xpZW50X2lkIjoiYmo1czg0bmY1cGo2NDc4bDk1bWZ0ZWE0dCIsInVzZXJuYW1lIjoiMTVmYTQ1OWEtYzllYy00NmRhLTgwM2UtMWY2NzI5MjdlMGUyIn0.N4aiob6cjVv6O-qxGKTv_vKZ-GI2Y9d3Lig-G2bePDJGtsGNbmMtBkVGMzdxHH_5gZGvZqCGEKKnXwKuIuN48RqX8HdmP-T4oa5SVDUjRcFrzDfLtb7CCv4IFSR3jsufXWNHQk-04ur12g_k0RPHnZhg1iuHYDv48MqdDEOBzY3wvpSh2FulftlSdy0JJwJ7mpmrivM_u5BcE8x5M1SYHXlkpRVyRzpkufMOQSlF8qNHZ5co2GeXFLi7e7KOepQMa71FjFD27djOMBORQxWeRF9lKCC_SyQ0UirTxiBde4goVmkUD2uRCzzLn8b-x-OE0OW68J7qsBuyZfuuYmE8pA",
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

    cy.intercept("/_next/data/development/index.json", (req) => {
      delete req.headers["if-none-match"];
      return req.continue((res) => {
        res.body.pageProps.authenticated = true;
        res.body.pageProps.user = {
          sub: "LA-EVW81B",
          email_verified: true,
          phone_number_verified: true,
          phone_number: "+4400000001234",
          email: "test-users+1626444065@clearcurrency.co.uk",
        };
      });
    });

    cy.location("pathname", { timeout: 30000 }).should("equal", "/login");

    cy.findByLabelText(/Email/i).type(
      "test-users+rory_1626444065@clearcurrency.co.uk"
    );
    cy.findByLabelText(/Password/i).type("4WC_y2lRQ");
    cy.findByRole("button", { name: /Sign in/i }).click();

    cy.location("pathname", { timeout: 30000 }).should(
      "equal",
      "/authenticate"
    );

    cy.findByLabelText(/Authentication code/i).type("123456");
    cy.findByRole("button", { name: /Sign in/i }).click();

    cy.findByText(/Which account/i).should("be.visible");
    cy.findAllByRole("link").should("have.length", 2);
  });
});
