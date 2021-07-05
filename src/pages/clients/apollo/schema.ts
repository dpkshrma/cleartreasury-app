import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";

import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    clients: [Client!]!
  }

  type Client {
    id: String!
    cli_id: Int!
    cli_reference: String
    cli_trader_id: Int
    cli_cold_caller_id: Int
    cli_affiliate_id: Int
    cli_affiliate2_id: Int
    cli_type_id: Int
    cli_name: String
    cli_address1: String
    cli_address2: String
    cli_address3: String
    cli_postcode: String
    cli_city: String
    cli_country_id: Int
    cli_fax: String
    cli_switchboard: String
    cli_creation_date: String
    cli_company_sic: String
    cli_company_number: String
    cli_status_id: Int
    cli_email: String
    cli_web: String
    cli_primary_contact_id: Int
    cli_alert: Int
    cli_comment: String
    cli_old_reference: String
    cli_trader_commission: String
    cli_archived: Int
    cli_web_login: String
    cli_web_password: String
    cli_web_commission: Int
    cli_web_disable_trading: Int
    cli_web_must_change_pwd: null
    cli_account_verified: Int
    cli_call_back_date: String
    cli_call_back_time: String
    cli_call_back_alert: Int
    cli_callback_priority_id: Int
    cli_competitor_note: String
    cli_activity_id: Int
    cli_profit_limit: Int
    cli_referer: String
    cli_unsubscribe_emails: Int
    cli_default_charge: String
    cli_ding_type: String
    cli_kyc_source: String
    cli_kyc_nature: String
    cli_kyc_country_origin_id: Int
    cli_kyc_avg_trade_size: String
    cli_kyc_max_trade_size: String
    cli_kyc_annual_volume: String
    cli_kyc_frequency: String
    cli_kyc_risk_profile: String
    cli_kyc_ccy: String
    cli_kyc_authorised: Int
    cli_company_id: Int
    cli_admin_note: String
    cli_cold_caller_commission: String
    cli_note1: String
    cli_note2: String
    cli_affiliate1_commission: String
    cli_affiliate2_commission: String
    cli_pool_commission: String
    cli_registration_cost: String
    cli_registred_IP_address: String
    cli_language_id: Int
    cli_kyc_pep: Int
    cli_kyc_fatca: Int
    cli_kyc_unlocked_until: String
    cli_cos_id: Int
    cli_start_business_date: String
    cli_balance_sheet: String
    cli_companies_house_up_to_date: Int
    cli_kyc_hpi: Int
    cli_can_trade_forward: Int
    cli_max_open_position: String
    cli_max_open_position_ccy: String
    cli_is_internal: Int
    cli_legal_status_id: Int
    cli_in_administration: Int
    cli_trading_as_name: String
    cli_trading_address1: String
    cli_trading_address2: String
    cli_trading_address3: String
    cli_trading_city: String
    cli_trading_postcode: String
    cli_trading_country_id: Int
    cli_company_vat: String
    cli_reason: String
    cli_kyc_source_of_wealth: String
    cli_kyc_Relationship_with_beneficiaries: String
    cli_agree_marketing_conditions: Int
    cli_agree_marketing_conditions_affiliates: Int
    cli_forward_margin: String
    cli_credit_limit: String
    cli_beneficiary_special_permission: Int
    cli_credit_agreement: Int
    cli_credit_percentage: String
    cli_kyc_complex_ownership_chain: Int
    cli_kyc_face_to_face: Int
    cli_kyc_adverse_news: Int
    cli_kyc_bearer_shares: Int
    cli_industry_group_id: Int
    cli_override_risk_profile: Int
    cli_incorporated_under_id: Int
    cli_kyc_note: String
    cli_web_disable_instructions: Int
    cli_license_expiry_date: String
    cli_regulator_name: String
    cli_web_currency_threshold_template_id: Int
    cli_web_disable_statement: String
    cli_web_currency_threshold_template_overnight_id: Int
    cli_operator_id: Int
    cli_trading_status_id: Int
    cli_kyc_non_UK_shareholder: Int
    cli_inc_avg_trade_size: Int
    cli_inc_annual_volume: Int
    cli_inc_frequency: Int
    cli_inc_ccy: String
    cli_inc_max_trade_size: Int
    cli_manager_id: Int
    cli_web_tfa: String
    cli_trust_pilot: String
  }
`;
export const schemaLink = new SchemaLink({
  schema: makeExecutableSchema({ typeDefs }),
});
