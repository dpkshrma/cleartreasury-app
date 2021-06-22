import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Button from "../components/button/Button";

import "../../configureAmplify";
import "../styles.css";

import {
  HomeIcon,
  UserCircleIcon,
  GlobeAltIcon,
  PlusCircleIcon,
  SupportIcon,
  MenuIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";

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
  const [user, setUser] = React.useState<User | undefined>();

  React.useEffect(() => {
    const getUser = async () => {
      const { attributes } = await Auth.currentAuthenticatedUser();
      // TODO: Quick'n'Dirty hack to get a username. This will come from the FXOps client record eventually
      attributes.username = attributes.email.split("@")[0];
      setUser(attributes);
    };

    getUser();
  }, []);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Head>
        <title>Clear Payments Platform</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

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
            <a
              className={`m-4 ${Button.STYLES.PRIMARY} ${Button.SIZES.MEDIUM}`}
            >
              Make a transfer
            </a>
          </Link>

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

      <div
        data-ui="Page scroll container"
        className="flex flex-col w-0 flex-1 overflow-hidden"
      >
        <header className="relative z-10 flex-shrink-0 flex h-14 bg-white shadow">
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
                  {user?.username.split("-")[0][0].toUpperCase()}{" "}
                  {user?.username.split("-")[1][0].toUpperCase()}
                </span>

                {user?.username}

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
                <AmplifySignOut />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

export default withAuthenticator(MyApp, { usernameAlias: "email" });
