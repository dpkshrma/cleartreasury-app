import * as React from "react";
import { Button, MoneyInput } from "@clear-treasury/design-system";
import { MoneyInputRef } from "@clear-treasury/design-system/dist/components/money-input/MoneyInput";
import { Client } from "../../pages/_app";
import { useQuery } from "../../hooks/useQuery";
import { GET_QUOTE } from "../../graphql/clients/queries";
import Countdown from "../countdown/Countdown";

// TODO: pull this back from the API eventually
import currencies from "./data/currencies.json";

export interface QuoteFormData {
  sell_amount?: number;
  currency_sell: string;
  buy_amount?: number;
  currency_buy: string;
  value_date: string;
  client_ref: string;
}

export interface QuoteFormProps {
  title: string;
  client?: Client;
  onComplete?: (formData: QuoteFormData) => void;
}

const defaultValues = {
  sell: { amount: "1000", currency: "GBP" },
  buy: { currency: "EUR" },
};

const currencyList = currencies.map(({ CurrencyCode }) => CurrencyCode);
const receiveCurrencyList = currencyList.filter(
  (CurrencyCode) => CurrencyCode !== defaultValues.sell.currency
);

// const today = new Date()
//   .toLocaleDateString("en-GB")
//   .split("/")
//   .reverse()
//   .join("");

const today = "20210811";

const QuoteForm = ({
  client,
  title,
  onComplete,
}: QuoteFormProps): JSX.Element => {
  const sell = React.useRef<MoneyInputRef | null>(null);
  const buy = React.useRef<MoneyInputRef | null>(null);

  const [formData, setFormData] = React.useState<QuoteFormData>({
    currency_sell: defaultValues.sell.currency,
    currency_buy: defaultValues.buy.currency,
    sell_amount: parseInt(defaultValues.sell.amount, 10),
    client_ref: client?.cli_reference,
    value_date: today, // TODO: to be fixed by PAY-35
  });

  // TODO: validation, error handling, blah blah :D
  const { data: quote } = useQuery(GET_QUOTE, formData);

  React.useEffect(() => {
    if (quote) {
      if (formData.buy_amount) {
        sell.current.amount.current.value = quote.sell_amount;
      }
      if (formData.sell_amount) {
        buy.current.amount.current.value = quote?.buy_amount;
      }
    }
  }, [quote, formData.buy_amount, formData.sell_amount]);

  const sellChange = () => {
    setFormData({
      ...formData,
      currency_sell: sell.current?.currency.current?.value,
      currency_buy: buy.current?.currency.current?.value,
      sell_amount: parseInt(sell.current?.amount.current?.value, 10) || 0,
      buy_amount: undefined,
    });
  };

  const buyChange = () => {
    setFormData({
      ...formData,
      currency_sell: sell.current?.currency.current?.value,
      currency_buy: buy.current?.currency.current?.value,
      buy_amount: parseInt(buy.current?.amount.current?.value, 10) || 0,
      sell_amount: undefined,
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onComplete(quote);
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
        onChange={sellChange}
        currencies={currencyList}
        defaultValue={defaultValues.sell}
      />

      <MoneyInput
        ref={buy}
        name="buy"
        label="They recieve"
        onChange={buyChange}
        defaultValue={defaultValues.buy}
        currencies={receiveCurrencyList}
      />

      <div className="flex justify-between">
        <p className="text-lg text-theme-color-on-surface">Exchange rate</p>

        <div className="flex">
          <Countdown
            time={20000}
            /* eslint-disable-next-line no-console */
            onComplete={() => console.log("Finished")}
            text={quote?.quote_rate || ""}
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
