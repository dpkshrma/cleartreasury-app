import gql from "graphql-tag";

export const INSTRUCT_PAYMENT = gql`
  mutation instructPayment($input: PaymentInput!) {
    instructPayment(input: $input) {
      beneficiary_id
      currency
      purpose
      amount
      payment_reference
      trade_ref
      payment_guid
      client_ref
      status
    }
  }
`;
