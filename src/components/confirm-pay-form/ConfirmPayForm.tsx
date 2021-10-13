import * as React from "react";
import Link from "next/link";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button } from "@clear-treasury/design-system";
import { Client } from "../../pages/_app";
import { FormData } from "../../pages/transfer";
import { GET_QUOTE } from "../../graphql/quotes/queries";
import { BOOK_TRADE } from "../../graphql/trades/mutations";
import { useQuery } from "../../hooks/useQuery";
import { useMutation } from "../../hooks/useMutation";
import { QuoteFormData } from "../quote-form/QuoteForm";

export type Trade = {
  ID: number;
  trade_ref: string;
  trade_date: string;
  value_date: string;
  currency_bought: string;
  currency_sold: string;
  rate: number;
  bought_amount: number;
  sold_amount: number;
  payment_fee: number;
  trade_type: "Spot" | "Forward";
  our_account_name: string;
  our_bank_name: string;
  our_iban: string;
  our_sort_code: string;
  our_swift_code: string;
};

interface ConfirmPayFormProps {
  data?: FormData;
  client?: Client;
  stepBack?: (step?: number) => void;
  onComplete?: (tradeData: any) => void;
}

const ConfirmPayForm = ({
  data,
  client,
  onComplete,
  stepBack,
}: ConfirmPayFormProps): JSX.Element => {
  const [quoting, setQuoting] = React.useState(false);
  const [bookTrade, setBookTrade] = React.useState(false);

  const [formData, setFormData] = React.useState<QuoteFormData>({
    currency_sell: data.quote.currency_sell,
    currency_buy: data.quote.currency_buy,
    sell_amount: data.quote.sell_amount,
    client_ref: client?.cli_reference,
    value_date: data.quote.value_date,
  });

  const { data: quote, loading } = useQuery(GET_QUOTE, formData);
  const { data: trade } = useMutation(bookTrade ? BOOK_TRADE : null, {
    input: {
      formData,
    },
  });

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setBookTrade(true);
  };

  React.useEffect(() => {
    // TODO: We need a more reliable way of requoting. The API returns the same ID so we need to tie this to something else (quote timestamps?)
    if (!loading && quoting) {
      setQuoting(false);
    }
  }, [loading, quoting]);

  React.useEffect(() => {
    // TODO: error handling
    if (trade) {
      onComplete(trade);
    }
  }, [trade]);

  const formatValueDate = () => {
    const output = [
      data.quote.value_date.slice(0, 4),
      "/",
      data.quote.value_date.slice(4, 6),
      "/",
      data.quote.value_date.slice(6, 8),
    ].join("");

    const today = new Date(output);

    return today.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <h2 className="text-2xl mb-2">Confirm and book</h2>
      <p className="text-l text-gray-500 mb-14">
        By confirming your quote below you are entering into a legal contract to
        trade as per our terms and conditions.
      </p>
      <div className="flex justify-between mb-4 border-b border-gray-200 pb-4">
        <h3 className="text-lg">Your quote</h3>
        <span className="text-green-400 cursor-pointer">Change</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">You Send</span>
        <span className="text-lg theme-color-on-surface">
          {data.quote.sell_amount.toFixed(2)} {data.quote.currency_sell}
        </span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">They recieve</span>
        <span className="text-lg theme-color-on-surface">
          {data.quote.buy_amount.toFixed(2)} {data.quote.currency_buy}
        </span>
      </div>
      <div className="flex justify-between mb-5">
        <div>
          <span className="text-lg theme-color-primary block">
            Exchange rate
          </span>
          <span className="text-xs theme-color-primary block">
            The rate quoted is a live rate, valid for 20 seconds.
          </span>
        </div>
        <div className="flex space-x-4">
          <CountdownCircleTimer
            size={36}
            strokeWidth={2}
            duration={20}
            key={!quoting && `${quote?.ID}_${quoting}`}
            isPlaying={data.quote?.quote_rate}
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
          <span>{data.quote?.quote_rate.toFixed(4)}</span>
        </div>
      </div>
      <div className="flex justify-between mb-14">
        <span className="text-lg theme-color-primary">Value Date</span>
        <span className="text-lg theme-color-on-surface">
          {formatValueDate()}
        </span>
      </div>
      <div className="flex justify-between mb-4 border-b border-gray-200 pb-4">
        <h3 className="text-lg">Beneficiary</h3>
        <span
          className="text-green-400 cursor-pointer"
          onClick={() => stepBack()}
        >
          Change
        </span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">Name</span>
        <span className="text-lg theme-color-on-surface">
          {data.beneficiary.account_name}
        </span>
      </div>
      <div className="flex justify-between mb-14">
        <span className="text-lg theme-color-primary">Email</span>
        <span className="text-lg theme-color-on-surface">
          {data.beneficiary.email}
        </span>
      </div>
      <div className="flex justify-center">
        <Link href="/">
          <a className="border-2 border-gray-700 rounded py-2.5 px-6 mr-6">
            Cancel
          </a>
        </Link>
        <Button size={Button.Size.LARGE}>Confirm and book</Button>
      </div>
    </form>
  );
};

export default ConfirmPayForm;
