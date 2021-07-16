import React from "react";

const ChooserAccount = ({ accounts, onAccountSelect }) => {
  return (
    <ul>
      {accounts.map((account) => (
        <li
          key={account.cli_reference}
          onClick={() => onAccountSelect(account)}
        >
          {account.cli_name}
        </li>
      ))}
    </ul>
  );
};

export default ChooserAccount;
