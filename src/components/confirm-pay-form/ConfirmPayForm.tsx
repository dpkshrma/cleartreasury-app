import * as React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { BOOK_TRADE } from "../../graphql/trades/mutations";
import { GET_QUOTE } from "../../graphql/quotes/queries";
import { useQuery } from "../../hooks/useQuery";
import { Button } from "@clear-treasury/design-system";
import { Client } from "../../pages/_app";
import { FormData } from "../../pages/transfer";
import { QuoteFormData } from "../quote-form/QuoteForm";
import Link from "next/link";
import moment from "moment";

interface ConfirmPayFormProps {
  data?: FormData;
  client?: Client;
  onComplete?: (tradeData: any) => void;
}

const ConfirmPayForm = ({
  data,
  client,
  onComplete,
}: ConfirmPayFormProps): JSX.Element => {
  const [quoting, setQuoting] = React.useState(false);
  const [formData, setFormData] = React.useState<QuoteFormData>({
    currency_sell: data.quote.currency_sell,
    currency_buy: data.quote.currency_buy,
    sell_amount: data.quote.sell_amount,
    client_ref: client?.cli_reference,
    value_date: "20210906",
  });

  // eslint-disable-next-line
  const [tradeData, setTradeData] = React.useState({
    quote_id: data.quote.ID,
    client_ref: "1233456",
    client_rate: data.quote.quote_rate,
    qutore_rate: data.quote.quote_rate,
  });

  // eslint-disable-next-line
  const { data: trade, loading } = useQuery(BOOK_TRADE, { input: tradeData });
  const { data: quote } = useQuery(GET_QUOTE, formData);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onComplete(trade);
  };

  React.useEffect(() => {
    // TODO: We need a more reliable way of requoting. The API returns the same ID so we need to tie this to something else (quote timestamps?)
    if (!loading && quoting) {
      setQuoting(false);
    }
  }, [loading, quoting]);

  return (
    <form onSubmit={submitHandler} className="space-y-6">
      <h2 className="text-2xl mb-2">Confirm and book</h2>
      <p className="text-l text-gray-500 mb-14">
        By confirming your quote below you are entering into a legal contract to
        trade as per our terms and conditions.
      </p>
      <h3 className="text-lg mb-4 border-b border-gray-200 pb-4">Your quote</h3>
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
          {moment(data.quote.value_date).format("Do MMMM YYYY")}
        </span>
      </div>
      <h3 className="text-lg mb-4 border-b border-gray-200 pb-4">
        Beneficiary
      </h3>
      <div className="flex justify-between mb-4">
        <span className="text-lg theme-color-primary">Name</span>
        <span className="text-lg theme-color-on-surface">
          {data.beneficiary.beneficiaryName}
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
