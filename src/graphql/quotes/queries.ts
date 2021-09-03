import gql from "graphql-tag";

export const GET_QUOTE = gql`
  query getQuote(
    $currency_sell: String
    $currency_buy: String
    $sell_amount: Float
    $buy_amount: Float
    $value_date: String
    $client_ref: String
  ) {
    getQuote(
      currency_sell: $currency_sell
      currency_buy: $currency_buy
      sell_amount: $sell_amount
      buy_amount: $buy_amount
      value_date: $value_date
      client_ref: $client_ref
    ) {
      ID
      sell_amount
      buy_amount
      quote_rate
      value_date
      currency_buy
      currency_sell
    }
  }
`;
