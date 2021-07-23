import {
  ChevronRightIcon,
  UserCircleIcon,
  BriefcaseIcon,
} from "@heroicons/react/outline";

const ChooseAccount = ({ accounts, onAccountSelect }) => {
  const onClickHandler = (event, account) => {
    event.preventDefault();
    onAccountSelect(account);
  };

  const accountTypes = {
    PRIVATE: { title: "Personal account", icon: UserCircleIcon },
    CORPORATE: { title: "Business account", icon: BriefcaseIcon },
  };

  return (
    <div className="w-screen h-screen flex flex-col space-y-6">
      <h1 className="bg-gray-200 text-center p-8 mt-14 text-4xl">
        Which account would you like to use?
      </h1>

      <div className="w-3/5 m:w-2/5 mx-auto">
        <h2 className="text-2xl">Account details</h2>
        <p className="text-lg text-gray-600">
          Your email address is associated with multiple accounts. Please select
          one to continue{" "}
        </p>
      </div>

      <ul className="space-y-2 w-3/5 m:w-2/5 mx-auto">
        {accounts.map((account) => (
          <a
            href="#"
            key={account.cli_reference}
            onClick={(e) => onClickHandler(e, account)}
            className="bg-gray-200 p-4 flex justify-between items-center hover:bg-gray-300"
          >
            <div className="flex items-center space-x-2">
              {accountTypes[account.cty_value].icon({
                className: "w-16 h-16 flex-shrink-0 text-teal-400 font-normmal",
              })}
              <div>
                <h3 className="text-xl text-gray-600">
                  {account.cli_name ||
                    account.ctc_first_name + " " + account.ctc_last_name}
                </h3>
                <span className="text-gray-400">
                  {accountTypes[account.cty_value].title}
                </span>
              </div>
            </div>
            <ChevronRightIcon className="w-5 h-5" />
          </a>
        ))}
      </ul>
    </div>
  );
};

export default ChooseAccount;
