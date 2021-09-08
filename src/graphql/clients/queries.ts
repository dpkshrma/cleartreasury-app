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

export const POST_TRADES = gql`
  mutation postTrades(
    $quote_id: Float
    $client_ref: String
    $client_rate: Float
    $quote_rate: Float
  ) {
    postTrades(
      quote_id: $quote_id
      client_ref: $client_ref
      client_rate: $client_rate
      quote_rate: $quote_rate
    ) {
      ID
      trade_ref
      trade_date
      value_date
      currency_bought
      currency_sold
      rate
      bought_amount
      sold_amount
      payment_fee
      trade_type
      our_account_name
      our_bank_name
      our_iban
      our_sort_code
      our_swift_code
    }
  }
`;
