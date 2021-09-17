import { Button, Flag, Input, Select } from "@clear-treasury/design-system";
import * as React from "react";
import { Client } from "../../pages/_app";
import Toggle from "../toggle/Toggle";
import reasons from "../../data/reasons.json";
import currencies from "../../data/currencies.json";
import { SelectChangeHandler } from "@clear-treasury/design-system/dist/components/select/Select";
import { ArrowLeftIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { MailIcon } from "@heroicons/react/outline";

export interface SelectBeneficiaryProps {
  client?: Client;
  stepBack?: (stepNumber: number) => void;
}

const currencyList: any[] = currencies.map(({ CurrencyCode }) => ({
  value: CurrencyCode,
  label: `${CurrencyCode}`,
  selectedLabel: CurrencyCode,
  icon: <Flag country={CurrencyCode.slice(0, -1).toLowerCase()} />,
}));

const SelectBeneficiary = ({
  client,
  stepBack,
}: SelectBeneficiaryProps): JSX.Element => {
  const search = React.useRef<HTMLInputElement | null>(null);
  const currency = React.useRef<HTMLInputElement | null>(null);
  const [reason, setReason] = React.useState<boolean>(false);

  const currencyChange: SelectChangeHandler = ({ selectedItem }) => {
    // todo
    alert(selectedItem);
  };

  return (
    <div className="space-y-6">
      <div className="block w-full">
        <h2 className="text-theme-color-on-surface text-2xl">
          Choose a beneficiary
        </h2>
        <p className="text-l text-gray-500">
          Please choose or add a beneficiary
        </p>
      </div>
      <div className="grid gap-4 grid-cols-2">
        <div>
          <Input ref={search} name="search" placeholder="Search" />
        </div>
        <div>
          <Select
            ref={currency}
            name="currencies"
            options={currencyList}
            onChange={currencyChange}
          />
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="grid grid-cols-4 gap-1 border-b border-gray-200 p-4">
          <div className="flex col-start-1 col-end-4">
            <div className="mr-4">
              <div className="max-h-11">
                <Flag country="gb" size="lg" />
              </div>
              <p className="text-base text-gray-800 text-center">GBP</p>
            </div>
            <div className="pt-2.5">
              <span className="text-lg text-gray-600">Alan Tester</span>
              <div className="flex">
                <div className="items-start mt-0.5">
                  <MailIcon width="18" />
                </div>
                <span className="text-gray-400 ml-3 items-start text-sm">
                  alan@email.com
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex justify-end flex-wrap content-center">
            <Toggle id="daily" checked={reason} onChange={setReason} />
          </div>
        </div>
        {reason && (
          <div className="p-4">
            <p className="text-lg text-gray-700 mb-2">Reason for transfer</p>
            <div>
              <Select
                name="select"
                options={
                  client.cty_value === "PRIVATE"
                    ? reasons.OPTIONS_REASON_PERSONAL
                    : reasons.OPTIONS_REASON_BUSINESS
                }
              />
            </div>
            <p className="text-s text-gray-600">
              Please provide a reson for your payments to this beneficiary
            </p>
          </div>
        )}
      </div>
      <div className="flex border-b border-gray-200 flex justify-end pb-6">
        <Button
          size={Button.Size.MEDIUM}
          emphasis={Button.Emphasis.TRANSPARENT}
        >
          <PlusCircleIcon width="28" className="text-green-600" />
          Add a new beneficiary
        </Button>
      </div>
      <div className="flex justify-between">
        <Button
          size={Button.Size.SMALL}
          emphasis={Button.Emphasis.TRANSPARENT}
          onClick={() => stepBack(0)}
        >
          <ArrowLeftIcon width="16" />
          Back
        </Button>

        <Button size={Button.Size.LARGE}>Continue</Button>
      </div>
    </div>
  );
};

export default SelectBeneficiary;
