import gql from "graphql-tag";

export const GET_TRADE_HISTORY = gql`
  query getTrades($client_ref: String!) {
    getTrades(client_ref: $client_ref) {
      id
      bought_amount
      sold_amount
      sent_status
      received_status
      remittance_type
      trade_date
    }
  }
`;
