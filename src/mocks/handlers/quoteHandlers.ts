import { graphql } from "msw";

function randomInRange(min, max) {
  return Math.random() < 0.5
    ? (1 - Math.random()) * (max - min) + min
    : Math.random() * (max - min) + min;
}

export const quoteHandlers = [
  graphql.query("getQuote", (req, res, ctx) => {
    const { currency_buy, currency_sell, value_date } = req.variables;
    let { sell_amount, buy_amount } = req.variables;

    const quote_rate = randomInRange(1.0, 1.5);

    if (buy_amount) {
      sell_amount = buy_amount * quote_rate;
    }

    if (sell_amount) {
      buy_amount = sell_amount * quote_rate;
    }

    return res(
      ctx.data({
        getQuote: {
          ID: "1",
          sell_amount,
          buy_amount,
          quote_rate,
          value_date,
          currency_buy,
          currency_sell,
        },
      })
    );
  }),
];
