import * as React from "react";
import Countdown from "../countdown/Countdown";
import { Button, MoneyInput } from "@clear-treasury/design-system";
import "flag-icon-css/css/flag-icon.css"; //This is imported in the select component in the design system - should be global?

export interface CurrencyOptionProps {
  label?: string;
  value?: string;
  icon?: React.ReactNode;
  isHighlighted?: boolean;
}

export interface QuoteFormProps {
  title: string;
  currencies: CurrencyOptionProps[];
}

type Ref = HTMLFormElement;

const QuoteForm = React.forwardRef<Ref, QuoteFormProps>((props) => {
  return (
    <div className="space-y-6 max-w-2xl px-4">
      {/* ^^ Max width and padding not 100% right. Might depend on parent container? */}
      <h1 className="block w-full text-theme-color-on-surface text-2xl">
        {props.title}
      </h1>
      <MoneyInput
        options={props.currencies}
        name="money_sent"
        label="You send"
      />
      <MoneyInput
        options={props.currencies}
        name="money_recieved"
        label="They recieve"
      />
      <div className="flex justify-between">
        <p className="text-lg text-theme-color-on-surface">Exchange rate</p>
        <div className="flex">
          {/* eslint-disable-next-line no-console */}
          <Countdown time={2} onComplete={() => console.log("Finished")} />
          <span className="ml-2 text-lg text-gray-400">1.001</span>
        </div>
      </div>
      <div className="flex justify-between space-x-4 border-t border-gray-200 py-6">
        <span className="text-sm text-gray-500">
          The rate quoted is a live rate, valid for 20 seconds. You will be
          asked to accept a confirmed rate as part of the transfer process.
        </span>
        <Button size={Button.Size.LARGE}>Continue</Button>
      </div>
    </div>
  );
});

export default QuoteForm;
