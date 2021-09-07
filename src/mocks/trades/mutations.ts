import { graphql } from "msw";

interface bookTrade {
  trade: {
    ID: number;
    trade_ref: string;
    trade_date: string;
    value_date: string;
    currency_bought: string;
    currency_sold: string;
    rate: number;
    bought_amount: number;
    sold_amount: number;
    payment_fee: number;
    trade_type: string;
    our_account_name: string;
    our_bank_name: string;
    our_iban: string;
    our_sort_code: string;
    our_swift_code: string;
  };
}

export const tradeHandlers = [
  graphql.mutation<bookTrade>("postTrades", (req, res, ctx) => {
    return res(
      ctx.data({
        trade: {
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
