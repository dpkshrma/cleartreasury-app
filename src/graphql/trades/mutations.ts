import gql from "graphql-tag";

export const BOOK_TRADE = gql`
  mutation bookTrade($input: BookTradeInput!) {
    bookTrade(input: $input) {
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
