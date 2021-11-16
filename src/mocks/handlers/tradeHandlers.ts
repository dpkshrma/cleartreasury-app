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
  graphql.query("getTrades", (req, res, ctx) => {
    const trades = [
      {
        id: "d3c99551-486e-41f5-a09f-54226ef6e874",
        bought_amount: 454.1,
        bought_currency: "GBP",
        sold_amount: 500.0,
        sold_currency: "EUR",
        sent_status: "Success",
        received_status: "Success",
        remittance_type: "In",
        trade_date: "20200101",
      },
      {
        id: "77f441f8-6bf4-45a9-83bf-bcd71b4155ec",
        bought_amount: 759.5,
        bought_currency: "GBP",
        sold_amount: 750.0,
        sold_currency: "EUR",
        sent_status: "Failed",
        received_status: "Failed",
        remittance_type: "Out",
        trade_date: "20191224",
      },
      {
        id: "8910e829-3c38-4218-9d64-48a5163febf6",
        bought_amount: 890.77,
        bought_currency: "GBP",
        sold_amount: 850.0,
        sold_currency: "EUR",
        sent_status: "Pending",
        received_status: "Pending",
        remittance_type: "Out",
        trade_date: "20191111",
      },
      {
        id: "bacd3b42-ef5b-42f1-a9cd-d69eed66ab66",
        bought_amount: 860.75,
        bought_currency: "GBP",
        sold_amount: 850.0,
        sold_currency: "EUR",
        sent_status: "Success",
        received_status: "Pending",
        remittance_type: "In",
        trade_date: "20190505",
      },
    ];
    return res(
      ctx.data({
        getTrades: trades,
      })
    );
  }),
];
