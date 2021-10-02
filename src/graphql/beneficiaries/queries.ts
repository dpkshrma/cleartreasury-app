import gql from "graphql-tag";

export const GET_BENEFICIARIES = gql`
  query getBeneficiaries($client_ref: String!) {
    getBeneficiaries(client_ref: $client_ref) {
      intermediary
      account_name
      account_number
      address
      bankname
      currency
      notes
      sort_code
      swift
      country_code
      email
      ben_address
      id
      client_ref
    }
  }
`;
