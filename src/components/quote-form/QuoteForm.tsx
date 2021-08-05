import * as React from "react";
import { Button, MoneyInput } from "@clear-treasury/design-system";
import Countdown from "../countdown/Countdown";
import currencies from "./data/currencies.json";
import { MoneyInputRef } from "@clear-treasury/design-system/dist/components/money-input/MoneyInput";

export interface QuoteFormData {
  sell_amount?: number;
  currency_sell: string;
  buy_amount?: number;
  currency_buy: string;
  value_date: string;
}

export interface QuoteFormProps {
  title: string;
  onComplete?: (formData: QuoteFormData) => void;
}

const currencyList = currencies.map(({ CurrencyCode }) => CurrencyCode);

const QuoteForm = ({ title, onComplete }: QuoteFormProps): JSX.Element => {
  const sell = React.useRef<MoneyInputRef | null>(null);
  const buy = React.useRef<MoneyInputRef | null>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    onComplete({
      sell_amount: sell.current.amount.value,
      currency_sell: sell.current.currency.value,
      buy_amount: buy.current.amount.value,
      currency_buy: buy.current.currency.value,
      value_date: "", // TODO: calculate value date
    });
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6">
      {/* TODO: ^^ Max width and padding not 100% right. Might depend on parent container? */}
      <h1 className="block w-full text-theme-color-on-surface text-2xl">
        {title}
      </h1>

      <MoneyInput
        ref={sell}
        name="sell"
        label="You send"
        currencies={currencyList}
        defaultValue={{ amount: "1000", currency: "GBP" }}
      />

      <MoneyInput
        ref={buy}
        name="buy"
        label="They recieve"
        defaultValue={{ currency: "EUR" }}
        currencies={currencyList}
      />

      <div className="flex justify-between">
        <p className="text-lg text-theme-color-on-surface">Exchange rate</p>

        <div className="flex">
          {/* eslint-disable-next-line no-console */}
          <Countdown
            time={20}
            onComplete={() => console.log("Finished")}
            text="1.001"
          />
        </div>
      </div>

      <div className="flex justify-between space-x-4 border-t border-gray-200 py-6">
        <span className="text-sm text-gray-500">
          The rate quoted is a live rate, valid for 20 seconds. You will be
          asked to accept a confirmed rate as part of the transfer process.
        </span>

        <Button size={Button.Size.LARGE}>Continue</Button>
      </div>
    </form>
  );
};

export default QuoteForm;
