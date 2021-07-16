import React from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";

const ChooserAccount = ({ accounts, onAccountSelect }) => {
  const onClickHandler = (event, account) => {
    event.preventDefault();
    onAccountSelect(account);
  };

  return (
    <div className="w-screen h-screen flex flex-col space-y-6">
      <h1 className="bg-gray-200 text-center p-8 mt-14 text-4xl">
        Which account would you like to use?
      </h1>

      <div className="w-2/5 mx-auto">
        <h2 className="text-2xl">Account details</h2>
        <p className="text-lg text-gray-600">
          Your email address is associated with multiple accounts. Please select
          one to continue{" "}
        </p>
      </div>

      <ul className="space-y-2 w-2/5 mx-auto">
        {accounts.map((account) => (
          <a
            href="#"
            key={account.cli_reference}
            onClick={(e) => onClickHandler(e, account)}
            className="text-xl text-gray-600 bg-gray-200 p-4 flex justify-between items-center"
          >
            {account.cli_name}
            <ChevronRightIcon className="w-5 h-5" />
          </a>
        ))}
      </ul>
    </div>
  );
};

export default ChooserAccount;
