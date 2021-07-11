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
  query getClients {
    clients {
      id
      reference
      name
      email
    }
  }
`;
