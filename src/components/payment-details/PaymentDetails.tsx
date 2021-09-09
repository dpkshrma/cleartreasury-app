import { Alert, Button } from "@clear-treasury/design-system";
import Link from "next/link";
import * as React from "react";
import { FormData } from "../../pages/transfer";

interface PaymentDetailsProps {
  data?: FormData;
}

const PaymentDetails = ({ data }: PaymentDetailsProps): JSX.Element => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl mb-2">Payment details</h2>
      <p className="text-l text-gray-500 mb-14">
        Settle your currency trade by logging in to your bank and making a
        domestic payment to Clear Treasury using the following details:
      </p>
      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">Bank name</span>
        <span className="text-lg theme-color-on-surface">
          {data.beneficiary?.bank_name}
        </span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">
          Bank account holders name
        </span>
        <span className="text-lg theme-color-on-surface">
          {data.beneficiary?.account_name}
        </span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">Account number</span>
        <span className="text-lg theme-color-on-surface">
          {data.beneficiary?.account_number}
        </span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">Sort code</span>
        <span className="text-lg theme-color-on-surface">
          {data.beneficiary?.sort_code}
        </span>
      </div>
      {data.beneficiary.swiftNumber !== undefined && (
        <div className="flex justify-between mb-4">
          <span className="text-lg theme-color-primary">Bic/SWIFT code</span>
          <span className="text-lg theme-color-on-surface">BarcgB00</span>
        </div>
      )}
      {data.beneficiary.iban !== undefined && (
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
          {data.trade.trade_ref}
        </span>
      </div>
      <div className="pb-8 border-b border-gray-200 mb-14">
        <Alert
          status={Alert.Status.PRIMARY}
          text={`An email confirming the above details and outlining next steps has been sent to ${data.beneficiary.email}`}
        />
      </div>
      <div className="flex justify-end">
        <Link href="/">
          <Button size={Button.Size.LARGE}>Continue</Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentDetails;
