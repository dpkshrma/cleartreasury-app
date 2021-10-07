import jwt from "jsonwebtoken";
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
          auth_time: Date.now(),
          exp: Date.now() + 3600,
          username: mockData.cognitoUser.sub,
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
        res.body.pageProps.authenticated = true;
        res.body.pageProps.user = mockData.cognitoUser;
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
