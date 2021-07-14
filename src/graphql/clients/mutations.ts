import gql from "graphql-tag";

export const CREATE_CLIENT = gql`
  mutation CreateClient(
    $id: ID
    $reference: String
    $name: String
    $email: String
  ) {
    createClient(id: $id, reference: $reference, name: $name, email: $email) {
      id
      reference
      name
      email
    }
  }
`;
