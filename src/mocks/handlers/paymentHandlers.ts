import { graphql } from "msw";

export const paymentHandlers = [
  graphql.mutation("instructPayment", (req, res, ctx) => {
    return res(
      ctx.data({
        instructPayment: {
          ...req.body.variables.input,
          payment_guid: "04a44916-d18d-48e5-b004-0bef3b57d7f3",
          payment_reference: "48218ccf-2b23-4b89-884f-a54b84a514ea",
          status: "Pending",
        },
      })
    );
  }),
];
