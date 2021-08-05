import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Auth } from "aws-amplify";
import { useQuery } from "../hooks/useQuery";
import { GET_CLIENTS } from "../graphql/clients/queries";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Page from "../components/page/Page";
import ChooseAccount from "../components/choose-account/ChooseAccount";

import "../../configureAmplify";
import "../styles.css";

if (process.env.NEXT_PUBLIC_API_MOCKING) {
  require("../mocks");
}

interface User {
  email: string;
  username: string;
}

export interface Client {
  cli_name: string;
  cli_email: string;
  cty_value: string;
  cli_reference: string;
  ctc_first_name: string;
  ctc_last_name: string;
}

const AppContext = React.createContext({});

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [client, setClient] = React.useState<Client | null>(null);

  React.useEffect(() => {
    checkUserAuth();
  }, [pageProps.authenticated]);

  const checkUserAuth = async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      setUser(attributes);
    } catch (error) {
      setUser(null);
    }
  };

  const { data: clients, loading: clientsLoading } = useQuery(
    user ? GET_CLIENTS : null,
    {
      cli_email: user?.email,
    }
  );

  // TODO: Sort out a proper loading screen
  if (pageProps.authenticated && clientsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Page>
          <h1 className="m-auto">Loading...</h1>
        </Page>
      </div>
    );
  }

  if (!client && clients?.length > 1) {
    return <ChooseAccount accounts={clients} onAccountSelect={setClient} />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Head>
        <title>Clear Payments Platform</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <React.Fragment>
        {pageProps.authenticated && (
          <Sidebar
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
            router={router}
          />
        )}

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-gray-600 opacity-75"
            aria-hidden="true"
          ></div>
        )}

        <div
          data-ui="Page scroll container"
          className="flex-1 w-0 flex flex-col"
        >
          {pageProps.authenticated && (
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              client={client}
              setUser={setUser}
            />
          )}

          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <AppContext.Provider value={user}>
              <Component {...pageProps} setContext={setUser} client={client} />
            </AppContext.Provider>
          </main>
        </div>
      </React.Fragment>
    </div>
  );
};

// TODO: figure out the correct return type for React.useContext
export const useApp = (): Record<string, unknown> => {
  return React.useContext(AppContext);
};

export default App;
