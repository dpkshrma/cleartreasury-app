import { graphql } from "msw";

export const beneficiaryHandlers = [
  graphql.mutation("createBeneficiary", (req, res, ctx) => {
    return res(
      ctx.data({
        createBeneficiary: {
          id: "1",
          message: "Beneficiary added to client's list",
        },
      })
    );
  }),
];
