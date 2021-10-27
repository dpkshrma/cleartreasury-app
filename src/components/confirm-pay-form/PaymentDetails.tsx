import * as React from "react";
import Link from "next/link";
import { Alert, Button } from "@clear-treasury/design-system";
import { TransferData } from "../../pages/transfer";

interface PaymentDetailsProps {
  details: TransferData;
}

const PaymentDetails = ({ details }: PaymentDetailsProps): JSX.Element => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl mb-2">Payment details</h2>

      <p className="text-l text-gray-500 mb-14">
        Settle your currency trade by logging in to your bank and making a
        domestic payment to Clear Treasury using the following details:
      </p>

      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">
          Bank account holders name
        </span>

        <span className="text-lg theme-color-on-surface">
          {details.beneficiary?.account_name}
        </span>
      </div>

      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">Bank name</span>
        <span className="text-lg theme-color-on-surface">
          {details.beneficiary?.bankname}
        </span>
      </div>

      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">Account number</span>
        <span className="text-lg theme-color-on-surface">
          {details.beneficiary?.account_number}
        </span>
      </div>

      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">Sort code</span>
        <span className="text-lg theme-color-on-surface">
          {details.beneficiary?.sort_code}
        </span>
      </div>

      {details.beneficiary.swift !== undefined && (
        <div className="flex justify-between mb-4">
          <span className="text-lg theme-color-primary">Bic/SWIFT code</span>
          <span className="text-lg theme-color-on-surface">BarcgB00</span>
        </div>
      )}

      {details.beneficiary.iban !== undefined && (
        <div className="flex justify-between mb-4">
          <span className="text-lg theme-color-primary">IBAN number</span>
          <span className="text-lg theme-color-on-surface">
            ABCD-1234-1234-1234-1234
          </span>
        </div>
      )}

      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">Payment reference</span>
        <span className="text-lg theme-color-on-surface">
          {details.trade.trade_ref}
        </span>
      </div>

      <div className="pb-8 border-b border-gray-200 mb-14">
        <Alert
          status={Alert.Status.PRIMARY}
          text={`An email confirming the above details and outlining next steps has been sent to ${details.beneficiary.email}`}
        />
      </div>

      <div className="flex justify-end">
        <Button as={Link} href="/" size={Button.Size.LARGE}>
          <a>Continue</a>
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetails;
