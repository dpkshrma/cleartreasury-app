import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Auth } from "aws-amplify";
import { Button } from "@clear-treasury/design-system";
import {
  HomeIcon,
  UserCircleIcon,
  GlobeAltIcon,
  PlusCircleIcon,
  SupportIcon,
  MenuIcon,
  ChevronDownIcon,
  LogoutIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { GET_CLIENT } from "../graphql/clients/queries";
import { useQuery } from "../helpers/hooks/useQuery";
import "../../configureAmplify";
import "../styles.css";
import { useRouter } from "next/router";
import { useContext } from "react";

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
  { href: "/help", icon: SupportIcon, text: "Help and Support" },
];

const AppContext = React.createContext({});

function MyApp({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (error) {
      setUser(null);
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
  }, [pageProps.authenticated]);

  // TODO: remove redundant console logs and eslint suppressors later
  const {
    data: client,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loading: clientLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: clientError,
  } = useQuery(GET_CLIENT, { id: 1 });

  return (
    <div className="h-screen flex overflow-hidden bg-theme-color-background">
      <Head>
        <title>Clear Payments Platform</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <React.Fragment>
        {pageProps.authenticated && (
          <div
            data-ui="Sidebar"
            className={`bg-teal-700 flex-wrap flex-col md:flex md:flex-shrink-0 w-64 pt-5 pb-4 ${
              sidebarOpen ? "flex" : "hidden"
            }`}
          >
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/">
                <a>
                  <img
                    className="w-full"
                    src="/clear_full_logo_light.svg"
                    alt="Clear Currency"
                  />
                </a>
              </Link>
            </div>

            <div className="mt-5 flex-1 flex flex-col">
              <div className="px-3 flex-col flex">
                <Button>Make a transfer</Button>
              </div>
              <nav className="flex-1 space-y-1">
                <ul>
                  {navigation.map((item, index) => (
                    <li
                      key={index}
                      className={index === 3 ? "border-t border-teal-400" : ""}
                    >
                      <Link href={item.href}>
                        <a className="text-white border-teal-700 hover:bg-teal-500 hover:border-green-600 border-l-4 group flex items-center pl-2 pr-4 py-4 transition-colors duration-300">
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
          {pageProps.authenticated && (
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
                      {client?.data?.name.split(" ")[0][0].toUpperCase()}{" "}
                      {client?.data?.name.split(" ")[1][0].toUpperCase()}
                    </span>

                    {client?.name}

                    <ChevronDownIcon className="h-5 w-5 ml-2" />
                  </button>

                  <div
                    className={`${
                      userMenuOpen ? "" : "hidden"
                    } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-gray-100 focus:outline-none`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <a
                      href="#"
                      // onClick={signOut}
                      className="flex px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 justify-end"
                    >
                      Profile <UserIcon className="h-5 w-5 ml-2" />
                    </a>
                    <a
                      href="#"
                      onClick={signOut}
                      className="flex px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 justify-end border-t border-gray-200"
                    >
                      Sign out <LogoutIcon className="h-5 w-5 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </header>
          )}

          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <AppContext.Provider value={user}>
              <Component {...pageProps} setContext={setUser} />
            </AppContext.Provider>
          </main>
        </div>
      </React.Fragment>
    </div>
  );
}

export function useApp() {
  return useContext(AppContext);
}

export default MyApp;
