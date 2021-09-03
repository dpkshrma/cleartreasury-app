import gql from "graphql-tag";

export const CREATE_BENEFICIARY = gql`
  mutation createBeneficiary($input: CreateBeneficiaryInput!) {
    createBeneficiary(input: $input) {
      id
      message
    }
  }
`;
