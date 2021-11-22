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
        trade_ref: "0000001",
        bought_currency: "EUR",
        sold_currency: "GBP",
        bought_amount: 1187.5,
        sold_amount: 1000,
        title: "500.00 EUR received",
        status: "Success",
        remittance_type: "In",
        trade_date: "20200101",
        timeline: [
          { title: "Instruction", status: "Success" },
          { title: "Funds received", status: "Success" },
          { title: "Conversion", status: "Success" },
          { title: "Onward payment sent", status: "Success" },
        ],
        payments: [
          {
            amount: 1187.5,
            beneficiary_name: "Alan Tester",
          },
        ],
      },
      {
        id: "77f441f8-6bf4-45a9-83bf-bcd71b4155ec",
        trade_ref: "0000002",
        bought_currency: "INR",
        sold_currency: "USD",
        bought_amount: 372267.0,
        sold_amount: 5000,
        title: "759.50 GBP sent",
        status: "Failed",
        remittance_type: "Out",
        trade_date: "20191224",
        timeline: [
          { title: "Instruction", status: "Success" },
          { title: "Funds received", status: "Success" },
          { title: "Conversion", status: "Failed" },
          { title: "Onward payment sent", status: null },
        ],
      },
      {
        id: "8910e829-3c38-4218-9d64-48a5163febf6",
        trade_ref: "0000003",
        bought_currency: "CNY",
        sold_currency: "GBP",
        bought_amount: 85712.2,
        sold_amount: 10000,
        title: "850.00 GBP received",
        status: "Pending",
        remittance_type: "Out",
        trade_date: "20191111",
        timeline: [
          { title: "Instruction", status: "Success" },
          { title: "Funds received", status: "Pending" },
          { title: "Conversion", status: null },
          { title: "Onward payment sent", status: null },
        ],
      },
      {
        id: "bacd3b42-ef5b-42f1-a9cd-d69eed66ab66",
        trade_ref: "0000004",
        bought_currency: "EUR",
        sold_currency: "GBP",
        bought_amount: 1187.5,
        sold_amount: 1000,
        title: "860.75 GBP sent",
        status: "Pending",
        remittance_type: "In",
        trade_date: "20190505",
        timeline: [
          { title: "Instruction", status: "Success" },
          { title: "Funds received", status: "Success" },
          { title: "Conversion", status: "Success" },
          { title: "Onward payment sent", status: "Pending" },
        ],
      },
    ];
    return res(
      ctx.data({
        getTrades: trades,
      })
    );
  }),
];
