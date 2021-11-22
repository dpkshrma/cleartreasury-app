import { Button, Flag } from "@clear-treasury/design-system";
import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/outline";
import * as React from "react";
import Page from "../components/page/Page";
import currencies from "../data/currencies.json";
import { GET_TRADE_HISTORY } from "../graphql/trades/queries";
import { useQuery } from "../hooks/useQuery";
import { Client } from "./_app";
import { ChevronUpIcon } from "@heroicons/react/solid";

type Props = {
  client: Client;
  authenticated: boolean;
};

export type TradeHistoryItem = {
  id: string;
  bought_currency: string;
  sold_currency: string;
  bought_amount: number;
  sold_amount: number;
  title: string;
  status: "Success" | "Failed" | "Pending";
  remittance_type: "In" | "Out";
  trade_date: string;
  trade_ref: string;
  timeline: {
    title: string;
    status: string;
  }[];
};

const StatusPill = ({ value }) => {
  const color = {
    pending: "text-yellow-600 bg-yellow-100",
    success: "text-green-600 bg-green-100",
    failed: "text-red-600 bg-red-100",
  }[value.toLowerCase()];
  return (
    <div className={`relative py-2 px-4 rounded-full text-xs ${color}`}>
      {value}
    </div>
  );
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

const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => {
  let classes =
    "h-11 w-11 stroke-current stroke-1 transform -rotate-45 text-gray-400";
  if (className) {
    classes += className;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
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
  data: TradeHistoryItem;
}

const TransactionStep = ({ title, status }) => {
  let statusColor = "gray-400";
  if (status) {
    statusColor = {
      Pending: "yellow-600",
      Failed: "red-700",
      Success: "green-700",
    }[status];
  }
  return (
    <div className="flex items-center mb-2">
      <div className={`rounded-full w-3 h-3 mr-2 mt-1 bg-${statusColor}`} />
      <div className={`text-${statusColor}`}>{title}</div>
    </div>
  );
};

const flags = currencies.reduce((acc, currency) => {
  const code = currency.CurrencyCode;
  acc[code] = <Flag country={code.slice(0, -1).toLowerCase()} size="lg" />;
  return acc;
}, {});

const formatAmount = (amt: number) => {
  return amt && amt.toLocaleString("en-GB", { minimumFractionDigits: 2 });
};

const TransactionRow: React.FunctionComponent<TransactionRowProps> = ({
  data,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const onHeaderClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mb-2 select-none">
      <div
        className="bg-theme-color-background px-5 py-4 flex items-center justify-items-start cursor-pointer"
        onClick={onHeaderClick}
      >
        <div className="mr-4 flex flex-col items-center">
          {flags[data.bought_currency]}
          <div className="text-sm text-gray-800">{data.bought_currency}</div>
        </div>
        <div className="flex flex-col items-center h-full">
          <ArrowIcon />
          <div className="text-xs text-gray-400 mt-1">OUT</div>
        </div>
        <div className="flex flex-col h-full ml-5">
          <div className="text-3xl text-gray-600 mb-2">
            {formatAmount(data.bought_amount)}
          </div>
          <div className="text-sm text-gray-500">
            {formatAmount(data.sold_amount)} {data.sold_currency}
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <div className="text-gray-500 text-sm mr-2">
            trade id: {data.trade_ref}
          </div>
          <StatusPill value={data.status} />
          {expanded ? (
            <ChevronUpIcon height={16} />
          ) : (
            <ChevronDownIcon height={16} />
          )}
        </div>
      </div>
      <div
        className={`
        overflow-hidden
        transition-max-height
        duration-500
        ease-in-out
        bg-gray-100
        ${expanded ? "max-h-96" : "max-h-0"}
      `}
      >
        <div className="flex flex-col border-t-2 px-5 py-4">
          {data.timeline.map((step) => (
            <TransactionStep
              key={step.title}
              title={step.title}
              status={step.status}
            />
          ))}
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
        {txns.map((txn: TradeHistoryItem) => (
          <TransactionRow key={txn.id} data={txn} />
        ))}
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

  if (loading || txnsLoading) {
    return <Page>Loading...</Page>;
  }

  return (
    <Page>
      {txns ? (
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
