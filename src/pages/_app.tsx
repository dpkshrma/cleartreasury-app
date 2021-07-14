import React from "react";
import Head from "next/head";
import Link from "next/link";
import { API, Auth, graphqlOperation, Hub } from "aws-amplify";
import { Button } from "@clear-treasury/design-system";
import {
  HomeIcon,
  UserCircleIcon,
  GlobeAltIcon,
  PlusCircleIcon,
  SupportIcon,
  MenuIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";

import { GET_CLIENT, GET_CLIENTS } from "../graphql/clients/queries";

import "../../configureAmplify";
import "../styles.css";
import { useRouter } from "next/router";

if (process.env.NEXT_PUBLIC_API_MOCKING) {
  require("../mocks");
}

interface User {
  email: string;
  username: string;
}

const navigation = [
  { href: "/", icon: HomeIcon, text: "Dashboard" },
  { href: "/", icon: UserCircleIcon, text: "Beneficiaries" },
  { href: "/", icon: GlobeAltIcon, text: "My Transfers" },
  { href: "/", icon: PlusCircleIcon, text: "Add ons" },
  { href: "/", icon: SupportIcon, text: "Help and Support" },
];

function MyApp({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [client, setClient] = React.useState(null);
  const [clients, setClients] = React.useState(null);
  const router = useRouter();

  // TODO: remove this later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isClientsLoading, setIsClientLoading] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clientsError, setClientsError] = React.useState(null);

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  };

  const fetchClient = async () => {
    try {
      if (!client) {
        setIsClientLoading(true);

        const clientResponse: any = await API.graphql(
          graphqlOperation(GET_CLIENT, { id: 1 })
        );

        if (
          clientResponse &&
          clientResponse.data &&
          clientResponse.data.client
        ) {
          setClient(clientResponse.data.client);
        }
      }
    } catch (error) {
      setClientsError(error);
    } finally {
      setIsClientLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      if (!clients) {
        setIsClientLoading(true);

        const clientsResponse: any = await API.graphql(
          graphqlOperation(GET_CLIENTS)
        );

        if (
          clientsResponse &&
          clientsResponse.data &&
          clientsResponse.data.clients
        ) {
          setClients(clientsResponse.data.clients);
        }
      }
    } catch (error) {
      setClientsError(error);
    } finally {
      setIsClientLoading(false);
    }
  };

  async function signOut() {
    try {
      await Auth.signOut().then(() => {
        router.push("login");
        setUser(null);
      });
    } catch (error) {
      router.push("login");
      setUser(null);
    }
  }

  React.useEffect(() => {
    checkUser();
  }, []);

  React.useEffect(() => {
    if (user) {
      fetchClient();
      fetchClients();
      Hub.listen("auth", checkUser);
    } else {
      router.push("login");
    }
  }, [user]);

  return (
    <div className="h-screen flex overflow-hidden bg-theme-color-background">
      <Head>
        <title>Clear Payments Platform</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <React.Fragment>
        {user && (
          <div
            data-ui="Sidebar"
            className={`bg-teal-700 flex-col md:flex md:flex-shrink-0 w-64 pt-5 pb-4 ${
              sidebarOpen ? "flex" : "hidden"
            }`}
          >
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/">
                <a>
                  <img
                    className="h-6 sm:h-8 w-full"
                    src="/clear_full_logo_light.svg"
                    alt="Clear Currency"
                  />
                </a>
              </Link>
            </div>

            <div className="mt-5 flex-1 flex flex-col">
              <Link href="/transfer">
                <a>make a transfer</a>
              </Link>

              <Button>Button</Button>

              <nav className="flex-1 space-y-1">
                <ul>
                  {navigation.map((item, index) => (
                    <li
                      key={index}
                      className={index === 3 ? "border-t border-teal-400" : ""}
                    >
                      <Link href={item.href}>
                        <a className="text-white hover:bg-teal-500 group flex items-center px-4 py-4">
                          <item.icon
                            className="mr-3 flex-shrink-0 h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                          {item.text}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}

        <div
          data-ui="Page scroll container"
          className="flex flex-col w-0 flex-1 overflow-hidden"
        >
          {user && (
            <header className="relative z-10 flex-shrink-0 flex h-14 bg-theme-color-surface shadow">
              <button
                type="button"
                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="flex-1 px-4 flex items-center justify-end">
                <div className="relative">
                  <button
                    className="flex items-center"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <span className="rounded-full text-white font-bold bg-gray-500 p-1.5 mr-2">
                      {client?.name.split(" ")[0][0].toUpperCase()}{" "}
                      {client?.name.split(" ")[1][0].toUpperCase()}
                    </span>

                    {client?.name}

                    <ChevronDownIcon className="h-5 w-5 ml-2" />
                  </button>

                  <div
                    className={`${
                      userMenuOpen ? "" : "hidden"
                    } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <Button onClick={signOut} size={Button.Size.LARGE}>
                      SIGN OUT
                    </Button>
                  </div>
                </div>
              </div>
            </header>
          )}

          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <Component {...pageProps} />
          </main>
        </div>
      </React.Fragment>
    </div>
  );
}

export default MyApp;
