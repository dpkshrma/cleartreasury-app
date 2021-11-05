import * as React from "react";
import Link from "next/link";
import { Button } from "@clear-treasury/design-system";

import {
  HomeIcon,
  UserCircleIcon,
  GlobeAltIcon,
  PlusCircleIcon,
  SupportIcon,
  XIcon,
} from "@heroicons/react/outline";

const navigation = [
  { href: "/", icon: HomeIcon, text: "Dashboard" },
  { href: "#", icon: UserCircleIcon, text: "Beneficiaries" },
  { href: "#", icon: GlobeAltIcon, text: "My Transfers" },
  { href: "#", icon: PlusCircleIcon, text: "Add ons" },
  { href: "/help", icon: SupportIcon, text: "Help and Support" },
];

export interface SidebarProps {
  router: any;
  sidebarOpen: boolean;
  setSidebarOpen: any;
}

const Sidebar = ({
  setSidebarOpen,
  sidebarOpen,
  router,
}: SidebarProps): JSX.Element => {
  return (
    <div
      data-ui="Sidebar"
      className={`w-64 ${
        sidebarOpen
          ? "fixed inset-0 flex z-40 flex-shrink-0"
          : "hidden lg:flex lg:flex-shrink-0"
      }`}
    >
      <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-teal-700">
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button
            className="
            ml-1
            flex
            items-center
            justify-center
            h-10
            w-10
            rounded-full
            focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
          "
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Close sidebar</span>
            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>

        <Link href="/">
          <a>
            <img
              className="w-full px-4"
              src="/clear_full_logo_light.svg"
              alt="Clear Currency"
            />
          </a>
        </Link>

        <div className="p-4 flex flex-col">
          <Button href="/transfer" as={Link}>
            <a>Make a transfer</a>
          </Button>
        </div>

        <nav>
          <ul>
            {navigation.map((item, index) => (
              <li
                key={index}
                className={index === 3 ? "border-t border-teal-400" : ""}
              >
                <Link href={item.href}>
                  <a
                    className={`text-white border-teal-700 hover:bg-teal-500 hover:border-green-600 border-l-4 group flex items-center pl-2 pr-4 py-4 transition-colors duration-300" ${
                      item.href === router.asPath
                        ? "bg-teal-500 border-green-600"
                        : ""
                    }`}
                  >
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
  );
};

export default Sidebar;
