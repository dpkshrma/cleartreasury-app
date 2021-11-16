import { parse, format } from "date-fns";
import { Button } from "@clear-treasury/design-system";
import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { ClockIcon } from "@heroicons/react/outline";
import Page from "../components/page/Page";
import { GET_TRADE_HISTORY } from "../graphql/trades/queries";
import { useQuery } from "../hooks/useQuery";
import { Client } from "./_app";

type Props = {
  client: Client;
  authenticated: boolean;
};

export type TradeHistoryItem = {
  id: string;
  bought_amount: number;
  sold_amount: number;
  bought_currency: string;
  sold_currency: string;
  sent_status: "Success" | "Failed" | "Pending";
  received_status: "Success" | "Failed" | "Pending";
  remittance_type: "In" | "Out";
  trade_date: string;
};

const TXN_STATUS_COLOR_MAP = {
  Pending: "text-yellow-600",
  Success: "text-green-600",
  Failed: "text-red-600",
};

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center bg-white">
      <div className="mt-16 mb-12">
        <img className="w-20" src="/welcome_icon_outline.svg" />
      </div>
      <div className="mb-4 text-xs text-teal-400 uppercase">Welcome</div>
      <div className="text-5xl font-serif font-light text-gray-700 mb-4">
        Make your first transfer
      </div>
      <div className="font-normal text-base mb-6">
        Move money from one currency to another quickly and easily
      </div>
      <div className="grid gap-4 grid-cols-2">
        <Button emphasis="secondary" inverted>
          Learn more
        </Button>
        <Button>Get started</Button>
      </div>
    </div>
  );
};

const LeftArrowIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-9 w-9 stroke-current stroke-1 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
      />
    </svg>
  );
};
const RightArrowIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-9 w-9 stroke-current stroke-1 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

interface TransactionRowProps {
  iconColor: string;
  state: "sending" | "receiving";
  data: TradeHistoryItem;
}

const TransactionRow: React.FunctionComponent<TransactionRowProps> = ({
  iconColor,
  data,
  state,
}) => {
  let amount = data.bought_amount;
  let currency = data.bought_currency;
  if (state === "receiving") {
    amount = data.sold_amount;
    currency = data.sold_currency;
  }
  return (
    <div className="bg-theme-color-background px-5 py-4 flex justify-items-start mb-2">
      <div className="flex flex-col items-center">
        {data.remittance_type === "In" ? (
          <RightArrowIcon className={iconColor} />
        ) : (
          <LeftArrowIcon className={iconColor} />
        )}
        <div className="text-xs text-theme-color-on-background">
          {data.remittance_type === "In" ? "IN" : "OUT"}
        </div>
      </div>
      <div className="flex flex-col h-full ml-5">
        <div className="text-base text-teal-700 mb-2">
          {amount} {currency} recieved
        </div>
        <div className="flex items-center">
          <ClockIcon className="h-5 w-5 stroke-current text-gray-400 mr-1" />
          <span className="text-sm text-sm text-gray-400">
            {format(
              parse(data.trade_date, "yyyyMMdd", new Date()),
              "do MMMM yyyy"
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
const RecentTransactions = ({ client, txns }) => {
  return (
    <div>
      <div className="m-12">
        <h1 className="text-4xl">Welcome {client?.ctc_first_name}</h1>
        <p className="text-lg text-gray-500">Where would you like to start?</p>
      </div>
      <div className="bg-white p-12">
        <div className="mb-8 text-2xl">Recent transactions</div>
        {txns.map((txn: TradeHistoryItem) => {
          let state: "sending" | "receiving" = "sending";
          let status = txn.sent_status;
          if (status === "Success") {
            state = "receiving";
            status = txn.received_status;
          }
          const iconColor = TXN_STATUS_COLOR_MAP[status];
          return (
            <TransactionRow
              data={txn}
              state={state}
              key={txn.id}
              iconColor={iconColor}
            />
          );
        })}
      </div>
    </div>
  );
};

const Dashboard = ({ client, authenticated }: Props): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const { data: txns, loading: txnsLoading } = useQuery<TradeHistoryItem[]>(
    GET_TRADE_HISTORY,
    {
      client_ref: client?.cli_reference,
    }
  );

  React.useEffect(() => {
    if (!authenticated) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [authenticated]);

  if (loading) {
    return <Page>Loading...</Page>;
  }

  return (
    <Page>
      {!txnsLoading && !!txns ? (
        <RecentTransactions client={client} txns={txns} />
      ) : (
        <WelcomeScreen />
      )}
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
    // res.writeHead(302, { Location: "/login" });
    // res.end();
    return {
      props: {
        authenticated: false,
        user: null,
      },
    };
  }
  // return { props: {} };
};

export default Dashboard;
