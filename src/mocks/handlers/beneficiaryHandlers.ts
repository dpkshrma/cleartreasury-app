import { graphql } from "msw";
import beneficiaries from "../data/beneficiaries";

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

  graphql.query("getBeneficiaries", (req, res, ctx) => {
    return res(
      ctx.data({
        getBeneficiaries: beneficiaries.filter(
          (beneficiary) =>
            beneficiary.client_ref === req.body.variables.client_ref
        ),
      })
    );
  }),
];
