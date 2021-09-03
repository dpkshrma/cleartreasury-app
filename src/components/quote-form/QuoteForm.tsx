import * as React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, MoneyInput } from "@clear-treasury/design-system";
import { MoneyInputRef } from "@clear-treasury/design-system/dist/components/money-input/MoneyInput";
import { Client } from "../../pages/_app";
import { useQuery } from "../../hooks/useQuery";
import { GET_QUOTE } from "../../graphql/quotes/queries";

// TODO: pull this from the API eventually
import currencies from "../../data/currencies.json";

export interface QuoteFormData {
  sell_amount?: number;
  currency_sell: string;
  buy_amount?: number;
  currency_buy: string;
  value_date: string;
  client_ref: string;
  timestamp?: number; // TODO: hack to get around not having timestamps in quotes (see useEffect below)
}

export interface QuoteFormProps {
  client?: Client;
  onComplete?: (formData: QuoteFormData) => void;
}

const defaultValues = {
  sell: { amount: "1000.00", currency: "GBP" },
  buy: { currency: "EUR" },
};

const currencyList = currencies.map(({ CurrencyCode }) => CurrencyCode);
let receiveCurrencyList = currencyList.filter(
  (CurrencyCode) => CurrencyCode !== defaultValues.sell.currency
);

const calculateValueDate = () => {
  const today = new Date();
  today.setDate(today.getDate());

  return today.toLocaleDateString("en-GB").split("/").reverse().join("");
};

const QuoteForm = ({ client, onComplete }: QuoteFormProps): JSX.Element => {
  const [quoting, setQuoting] = React.useState(false);

  const sell = React.useRef<MoneyInputRef | null>(null);
  const buy = React.useRef<MoneyInputRef | null>(null);

  const sellCurrency = sell.current?.currency.current?.value;
  const buyCurrency = buy.current?.currency.current?.value;

  const [formData, setFormData] = React.useState<QuoteFormData>({
    currency_sell: defaultValues.sell.currency,
    currency_buy: defaultValues.buy.currency,
    sell_amount: parseFloat(defaultValues.sell.amount),
    client_ref: client?.cli_reference,
    value_date: calculateValueDate(),
  });

  // TODO: validation, error handling, blah blah :D
  const { data: quote, loading } = useQuery(GET_QUOTE, formData);

  React.useEffect(() => {
    if (quote && quote.sell_amount !== null && quote.buy_amount !== null) {
      if (formData.buy_amount) {
        sell.current.amount.current.value = quote.sell_amount.toFixed(2);
      }
      if (formData.sell_amount) {
        buy.current.amount.current.value = quote?.buy_amount.toFixed(2);
      }
    }
  }, [quote, formData.buy_amount, formData.sell_amount]);

  React.useEffect(() => {
    // TODO: We need a more reliable way of requoting. The API returns the same ID for requotes so we need to tie this to something else (quote timestamps?)
    if (!loading && quoting) {
      setQuoting(false);
    }
  }, [loading, quoting]);

  const sellChange = ({ currency }) => {
    receiveCurrencyList = currencyList.filter(
      (currency) => currency !== sell.current.currency.current.value
    );

    if (currency === buyCurrency) {
      buy.current.currency.current.value = receiveCurrencyList[0];
    }

    setFormData({
      ...formData,
      currency_sell: sell.current?.currency.current?.value,
      sell_amount: parseFloat(sell.current?.amount.current?.value) || 0,
      currency_buy: buy.current?.currency.current?.value,
      buy_amount: undefined,
    });
  };

  const buyChange = ({ amount, currency }) => {
    setFormData({
      ...formData,
      currency_buy: currency,
      buy_amount: parseFloat(amount) || 0,
      currency_sell: sell.current?.currency.current?.value,
      sell_amount: undefined,
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onComplete(quote);
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6">
      <h1 className="block w-full text-theme-color-on-surface text-2xl">
        How much would you like to transfer?
      </h1>

      <MoneyInput
        ref={sell}
        name="sell"
        label="You send"
        onChange={sellChange}
        currencies={currencyList}
        defaultValue={defaultValues.sell}
        selectedCurrency={sellCurrency}
      />

      <MoneyInput
        ref={buy}
        name="buy"
        label="They recieve"
        onChange={buyChange}
        defaultValue={defaultValues.buy}
        currencies={receiveCurrencyList}
        selectedCurrency={buyCurrency}
      />

      <div className="flex justify-between">
        <p className="text-lg text-theme-color-on-surface">Exchange rate</p>

        <div className="flex space-x-4">
          {/* TODO: Teporarily using this library until our own Countdown's unmounting issues are fixed */}
          {quote?.quote_rate !== null && quote?.quote_rate !== undefined && (
            <CountdownCircleTimer
              size={36}
              strokeWidth={2}
              duration={20}
              key={!quoting && `${quote?.ID}_${quoting}`}
              isPlaying={quote?.quote_rate}
              colors={[
                ["#01A783", 0.5],
                ["#E6AE05", 0.25],
                ["#FF713D", 0.25],
              ]}
              onComplete={() => {
                setQuoting(true);
                setFormData({ ...formData, timestamp: Date.now() });
              }}
            />
          )}
          <span>{quote?.quote_rate}</span>
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
