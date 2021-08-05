import React from "react";
import Router from "next/router";
import { Auth } from "aws-amplify";
import {
  MenuIcon,
  ChevronDownIcon,
  LogoutIcon,
  UserIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";

export interface HeaderProps {
  setSidebarOpen: any;
  client: any;
  sidebarOpen: boolean;
  setUser: any;
  setClient: any;
}

const Header = ({
  sidebarOpen,
  setSidebarOpen,
  client,
  setUser,
  setClient,
}: HeaderProps): JSX.Element => {
  async function signOut(event: React.SyntheticEvent) {
    event.preventDefault();

    try {
      await Auth.signOut();
      Router.push("login");
      setUser(null);
    } catch (error) {
      // TODO: Handle error
      Router.push("login");
      setUser(null);
    }
  }
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const accountName =
    client?.cli_name || `${client?.ctc_first_name} ${client?.ctc_last_name}`;

  return (
    <header className="relative z-10 flex-shrink-0 flex h-14 bg-theme-color-surface shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
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
              {accountName.split(" ")[0][0].toUpperCase()}{" "}
              {accountName.split(" ")[1][0].toUpperCase()}
            </span>

            {accountName}

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
              onClick={signOut}
              className="flex px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 justify-end"
            >
              Profile <UserIcon className="h-5 w-5 ml-2" />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setClient(null);
                setUserMenuOpen(false);
              }}
              className="flex px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 justify-end border-t border-gray-200"
            >
              Switch account <SwitchHorizontalIcon className="h-5 w-5 ml-2" />
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
  );
};

export default Header;
