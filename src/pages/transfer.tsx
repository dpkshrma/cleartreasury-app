import React from "react";
import Page from "../components/page/Page";
import { withSSRContext } from "aws-amplify";
import {
  Button,
  Checkbox,
  Input,
  MoneyInput,
  Select,
} from "@clear-treasury/design-system";
import "flag-icon-css/css/flag-icon.css";
import Countdown from "../components/countdown/Countdown";
import { useState } from "react";

const moneyOptions = [
  {
    icon: (
      <span className="flag-icon-background flag-icon-gb pl-8 bg-left bg-contain" />
    ),
    label: "GBP",
    value: "GBP",
  },
  {
    icon: (
      <span className="flag-icon-background flag-icon-us pl-8 bg-left bg-contain" />
    ),
    label: "USD",
    value: "USD",
  },
  {
    icon: (
      <span className="flag-icon-background flag-icon-eu pl-8 bg-left bg-contain" />
    ),
    label: "EUR",
    value: "EUR",
  },
  {
    icon: (
      <span className="flag-icon-background flag-icon-ca pl-8 bg-left bg-contain" />
    ),
    label: "CAD",
    value: "CAD",
  },
];

const currencyPairs = [
  {
    currencyCode: "GBP",
    targetCurrencies: [
      {
        currencyCode: "USD",
      },
      {
        currencyCode: "EUR",
      },
      {
        currencyCode: "CAD",
      },
    ],
  },
  {
    currencyCode: "USD",
    targetCurrencies: [
      {
        currencyCode: "GBP",
      },
      {
        currencyCode: "EUR",
      },
      {
        currencyCode: "CAD",
      },
    ],
  },
  {
    currencyCode: "EUR",
    targetCurrencies: [
      {
        currencyCode: "GBP",
      },
      {
        currencyCode: "USD",
      },
    ],
  },
  {
    currencyCode: "CAD",
    targetCurrencies: [
      {
        currencyCode: "GBP",
      },
    ],
  },
];

const currencies = currencyPairs.map(
  ({ currencyCode }: { currencyCode: any }) => {
    const countryCode = currencyCode.slice(0, -1).toLowerCase();

    return {
      value: currencyCode,
      label: `${currencyCode}`,
      selectedLabel: currencyCode,
      icon: (
        <span
          className={`flag-icon-background flag-icon-${countryCode} pl-8 bg-left bg-contain`}
        />
      ),
    };
  }
);

function Transfer() {
  const [stepForm, setStepForm] = useState(0);

  const GetQuote = () => (
    <div className="max-w-xl w-full m-auto">
      <h2 className="text-2xl mb-8">How much would you like to transfer?</h2>
      <div className="mb-8">
        <MoneyInput label="You send" name="money" options={moneyOptions} />
      </div>
      <div className="mb-8">
        <MoneyInput label="They recieve" name="money" options={moneyOptions} />
      </div>
      <div className="flex justify-between pb-6">
        <p className="text-lg text-theme-color-on-surface">Exchange rate</p>
        <div className="flex">
          {/* eslint-disable-next-line no-console */}
          <Countdown time={2} onComplete={() => console.log("Finished")} />
          <span className="ml-2 text-lg text-gray-400">1.001</span>
        </div>
      </div>
      <div className="flex justify-between space-x-4 border-t border-gray-200 py-6">
        <p className="text-sm text-gray-500">
          The rate quoted is a live rate, valid for 20 seconds. You will be
          asked to accept a confirmed rate as part of the transfer process.
        </p>
        <Button size={Button.Size.LARGE}>Continue</Button>
      </div>
    </div>
  );

  const AddBeneficiary = () => (
    <div className="max-w-xl w-full m-auto">
      <h2 className="text-2xl mb-2">Beneficiary information</h2>
      <p className="text-l text-gray-500 mb-8">
        Please provide details of the beneficiary
      </p>
      <div className="mb-8">
        <Input
          type="text"
          name="beneficiaryName"
          label="Beneficiary name"
          placeholder="Enter the beneficiary name"
          hint="This is your reference for the account"
        />
      </div>
      <div className="mb-8">
        <Input
          type="email"
          name="email"
          label="Email address"
          placeholder="Enter their email address"
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <Select name="select" label="Currency" options={currencies} />
        </div>
        <div>
          <Select name="select" label="Currency" options={currencies} />
        </div>
      </div>
      <h2 className="text-2xl mb-2">Banking details</h2>
      <p className="text-l text-gray-500 mb-8">
        Please provide the beneficiaries banking details
      </p>
      <div className="mb-8">
        <Input
          type="text"
          name="bankAccountName"
          label="Bank account name"
          placeholder="Bank account name"
          hint="This is the name as it appears on their bank account"
        />
      </div>
      <div className="mb-8">
        <Input
          type="text"
          name="bankName"
          label="Bank name"
          placeholder="Bank name"
        />
      </div>
      <div className="mb-8">
        <Input
          type="text"
          name="accountNumber"
          label="Account number"
          placeholder="Account number"
        />
      </div>
      <div className="mb-8">
        <Input
          type="text"
          name="sortCode"
          label="Sort code"
          placeholder="Sort code"
        />
      </div>
      <h2 className="text-2xl mb-2">Reason for transfer</h2>
      <p className="text-l text-gray-500 mb-8">
        Please provide a reason for your payments to this beneficiary
      </p>
      <div className="border-b border-gray-200 pb-8">
        <Select name="select" options={currencies} />
      </div>
      <div className="py-8 flex justify-between">
        <div>
          <Button size={Button.Size.LARGE}>Back</Button>
        </div>
        <div>
          <Button size={Button.Size.LARGE}>Continue</Button>
        </div>
      </div>
    </div>
    // <div className="max-w-xl w-full m-auto">
    //   <h2 className="text-2xl mb-2">Enter the verification code</h2>
    //   <p className="text-l text-gray-500 mb-8">
    //     We have sent a 6 digit verification code to *******1969 It may take a few moments to arrive
    //   </p>
    //   <div className="pb-6 mb-8 border-b border-gray-200">
    //     <Input
    //       type="text"
    //       name="beneficiaryName"
    //       label="Verification code"
    //       placeholder="Enter code"
    //     />
    //   </div>
    //   <div className="grid justify-items-center">
    //     <Button size={Button.Size.LARGE}>Continue</Button>
    //   </div>
    // </div>
  );

  const BookTrade = () => (
    <div className="max-w-xl w-full m-auto">
      <h2 className="text-2xl mb-8">Confirm your quote</h2>
      <div className="flex justify-between mb-6">
        <span className="text-l text-gray-500">You send</span>
        <span className="text-l text-gray-800">1000 GBP</span>
      </div>
      <div className="flex justify-between mb-6">
        <span className="text-l text-gray-500">Exchange rate</span>
        <span className="text-l text-gray-800">12.345 (inverse 0.9876)</span>
      </div>
      <div className="flex justify-between mb-6">
        <span className="text-l text-gray-500">You get</span>
        <span className="text-l text-gray-800">1,2345 EUR</span>
      </div>
      <div className="flex justify-between mb-8">
        <span className="text-l text-gray-500">Settlement date</span>
        <span className="text-l text-gray-800">27th Oct 2020</span>
      </div>
      <div className="grid justify-items-center mb-8">
        <Checkbox
          label="I have read and agree to the terms of use"
          name="checkbox"
          id="terms"
        />
      </div>
      <div className="grid justify-items-center">
        <div className="flex space-x-4">
          <Button
            size={Button.Size.LARGE}
            inverted
            className="border px-6 border-gray-700 rounded-theme-radius"
          >
            Back
          </Button>
          <Button size={Button.Size.LARGE}>Confirm Quote</Button>
        </div>
      </div>
    </div>
    // <div className="max-w-xl w-full m-auto">
    //   <h2 className="text-2xl mb-2">Payment details</h2>
    //   <p className="text-l text-gray-500 mb-8">
    //     Settle your currency trade by logging in to your bank and making a domestic payment to Clear Treasury using the following details:
    //   </p>
    //   <div className="grid grid-cols-2 mb-6">
    //     <div>
    //       <span className="text-l text-gray-500">Bank name</span>
    //     </div>
    //     <div>
    //       <span className="text-l text-gray-800">Barclays Bank plc</span>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-2 mb-6">
    //     <div>
    //       <span className="text-l text-gray-500">Bank account holders name</span>
    //     </div>
    //     <div>
    //       <span className="text-l text-gray-800">Clear Treasury (UK Trading) Ltd</span>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-2 mb-6">
    //     <div>
    //       <span className="text-l text-gray-500">Account number</span>
    //     </div>
    //     <div>
    //       <span className="text-l text-gray-800">12345678</span>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-2 mb-6">
    //     <div>
    //       <span className="text-l text-gray-500">Bic/SWIFT code</span>
    //     </div>
    //     <div>
    //       <span className="text-l text-gray-800">BarcgB00</span>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-2 mb-6">
    //     <div>
    //       <span className="text-l text-gray-500">Sort code</span>
    //     </div>
    //     <div>
    //       <span className="text-l text-gray-800">12-34-56</span>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-2 mb-6">
    //     <div>
    //       <span className="text-l text-gray-500">IBAN number</span>
    //     </div>
    //     <div>
    //       <span className="text-l text-gray-800">ABCD-1234-1234-1234-1234</span>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-2 mb-6">
    //     <div>
    //       <span className="text-l text-gray-500">Payment reference</span>
    //     </div>
    //     <div>
    //       <span className="text-l text-gray-800">0987654321</span>
    //     </div>
    //   </div>
    //   <div className="pb-8 mb-14 border-b border-gray-200">
    //     <Alert
    //       text="An email confirming the above details and outlining next steps has been sent to user@email.com"
    //       status={Alert.Status.PRIMARY}
    //     />
    //   </div>
    //   <div className="grid justify-items-end">
    //     <Button size={Button.Size.LARGE}>Confirm Payment</Button>
    //   </div>
    // </div>
  );

  return (
    <Page>
      <div className="w-full">
        <h1 className="text-4xl text-center m-12">Make a transfer</h1>
        <div className="flex px-20">
          <div
            className={
              stepForm == 0
                ? "flex-1 py-3.5 px-2 cursor-pointer bg-white border-t-2 border-green-600"
                : "flex-1 py-3.5 px-2 cursor-pointer border-t-2 border-transparent"
            }
            onClick={() => setStepForm(0)}
          >
            <span className="rounded-full bg-theme-color-primary h-6 w-6 inline-block text-center justify-center text-white text-sm mr-2">
              1
            </span>
            <span className="text-gray-600">Amount</span>
          </div>
          <div
            className={
              stepForm == 1
                ? "flex-1 py-3.5 px-2 cursor-pointer bg-white border-t-2 border-green-600"
                : "flex-1 py-3.5 px-2 cursor-pointer border-t-2 border-transparent"
            }
            onClick={() => setStepForm(1)}
          >
            <span className="rounded-full bg-theme-color-primary h-6 w-6 inline-block text-center justify-center text-white text-sm mr-2">
              2
            </span>
            <span className="text-gray-600">Beneficiary</span>
          </div>
          <div
            className={
              stepForm == 2
                ? "flex-1 py-3.5 px-2 cursor-pointer bg-white border-t-2 border-green-600"
                : "flex-1 py-3.5 px-2 cursor-pointer border-t-2 border-transparent"
            }
            onClick={() => setStepForm(2)}
          >
            <span className="rounded-full bg-theme-color-primary h-6 w-6 inline-block text-center justify-center text-white text-sm mr-2">
              3
            </span>
            <span className="text-gray-600">Confirm and pay</span>
          </div>
        </div>
        <div className="bg-white py-10">
          {stepForm === 0 && <GetQuote />}
          {stepForm === 1 && <AddBeneficiary />}
          {stepForm === 2 && <BookTrade />}
        </div>
      </div>
    </Page>
  );
}

export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req });

  try {
    const user = await Auth.currentAuthenticatedUser();

    return {
      props: {
        authenticated: true,
        user: user.attributes,
      },
    };
  } catch (err) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return { props: {} };
}

export default Transfer;
