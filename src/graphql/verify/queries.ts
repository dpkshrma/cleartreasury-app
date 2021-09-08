import gql from "graphql-tag";

export const REQUEST_CODE = gql`
  query requestCode($To: String) {
    requestCode(To: $To) {
      to
      status
    }
  }
`;

export const VERIFY_CODE = gql`
  query verifyCode($To: String, $Code: String) {
    verifyCode(To: $To, Code: $Code) {
      to
      status
    }
  }
`;
