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
