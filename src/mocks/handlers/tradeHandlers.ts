import { graphql } from "msw";

export const tradeHandlers = [
  graphql.mutation("bookTrade", (req, res, ctx) => {
    return res(
      ctx.data({
        bookTrade: {
          ID: 2,
          trade_ref: "0000001",
          trade_date: "20200101",
          value_date: "20200101",
          currency_bought: "EUR",
          currency_sold: "GBP",
          rate: 1.1997028,
          bought_amount: 599.85,
          sold_amount: 500.0,
          payment_fee: 0,
          trade_type: "Spot",
          our_account_name: "string",
          our_bank_name: "string",
          our_iban: "string",
          our_sort_code: "string",
          our_swift_code: "string",
        },
      })
    );
  }),
];
