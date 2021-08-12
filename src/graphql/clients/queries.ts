import gql from "graphql-tag";

export const GET_CLIENT = gql`
  query getClient($id: ID) {
    client(id: $id) {
      id
      reference
      name
      email
    }
  }
`;

export const GET_CLIENTS = gql`
  query getClients($cli_email: String!) {
    getClients(cli_email: $cli_email) {
      cli_id
      cli_name
      cli_reference
      cty_value
      ctc_first_name
      ctc_last_name
    }
  }
`;

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
