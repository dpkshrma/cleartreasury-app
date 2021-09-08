import { graphql } from "msw";

export const verifyHandlers = [
  graphql.query("requestCode", (req, res, ctx) => {
    return res(
      ctx.data({
        requestCode: {
          to: req.variables.To,
          status: "pending",
        },
      })
    );
  }),

  graphql.query("verifyCode", (req, res, ctx) => {
    return res(
      ctx.data({
        verifyCode: {
          to: req.variables.To,
          status: "approved",
        },
      })
    );
  }),
];
