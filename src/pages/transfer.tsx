import React from "react";
import Page from "../components/page/Page";
import { withSSRContext } from "aws-amplify";
import { Button, Input, MoneyInput } from "@clear-treasury/design-system";
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
      <p className="text-l text-gray-500">
        Please provide details of the beneficiary
      </p>
      <Input
        type="password"
        name="newPassword"
        label="Beneficiary name"
        placeholder="Enter the beneficiary name"
      />
    </div>
  );

  const BookTrade = () => (
    <div className="max-w-xl w-full m-auto">
      <h2 className="text-2xl mb-8">Confirm your quote</h2>
    </div>
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
