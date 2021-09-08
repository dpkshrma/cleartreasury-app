import { Alert, Button } from "@clear-treasury/design-system";
import * as React from "react";
import { FormData } from "../../pages/transfer";
import { Client } from "../../pages/_app";

interface PaymentDetailsProps {
  data?: FormData;
  client?: Client;
  onComplete?: (tradeData: any) => void;
}

const PaymentDetails = ({
  data,
  // eslint-disable-next-line
  client,
  onComplete,
}: PaymentDetailsProps): JSX.Element => {
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onComplete(null);
  };
  return (
    <div className="bg-white py-10">
      <div className="max-w-xl w-full m-auto">
        <form onSubmit={submitHandler}>
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
              <span className="text-lg theme-color-primary">
                Bic/SWIFT code
              </span>
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
            <span className="text-lg theme-color-primary">
              Payment reference
            </span>
            <span className="text-lg theme-color-on-surface">0987654321</span>
          </div>
          <div className="pb-8 border-b border-gray-200 mb-14">
            <Alert
              status={Alert.Status.PRIMARY}
              text={`An email confirming the above details and outlining next steps has been sent to ${data.beneficiary.email}`}
            />
          </div>
          <div className="flex justify-end">
            <Button size={Button.Size.LARGE}>Continue</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetails;
