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
    let returnedBeneficiaries = [];

    // In test we can filter for email
    const testBeneficiaries = beneficiaries.filter(
      (beneficiary) => beneficiary.client_ref === req.body.variables.client_ref
    );

    if (testBeneficiaries.length) {
      returnedBeneficiaries = testBeneficiaries;
    } else {
      // Return 2 clients
      const fakeBeneficiaries = beneficiaries
        .filter((beneficiary) => beneficiary.client_ref === "123456")
        .map((beneficiary) => ({
          ...beneficiary,
          client_ref: req.body.variables.client_ref,
        }));

      returnedBeneficiaries = fakeBeneficiaries;
    }

    return res(
      ctx.data({
        getBeneficiaries: returnedBeneficiaries,
      })
    );
  }),
];
