import * as React from "react";
import { MailIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { SelectChangeHandler } from "@clear-treasury/design-system/dist/components/select/Select";
import { Error } from "@clear-treasury/design-system/dist/components/form-field/FormField";
import { Client } from "../../pages/_app";
import Toggle from "../toggle/Toggle";
import { Beneficiary } from "./BeneficiaryForm";
import {
  Alert,
  Button,
  Flag,
  Input,
  Select,
} from "@clear-treasury/design-system";

import reasons from "../../data/reasons.json";

export interface SelectBeneficiaryProps {
  client?: Client;
  stepBack?: (stepNumber: number) => void;
  onComplete?: (beneficiary: Beneficiary) => void;
  beneficiaries: Beneficiary[];
  addBeneficiary: () => void;
}

type Errors = {
  form?: Error;
  reason?: Error;
};

const SelectBeneficiary = ({
  client,
  stepBack,
  onComplete,
  beneficiaries = [],
  addBeneficiary,
}: SelectBeneficiaryProps): JSX.Element => {
  const search = React.useRef<HTMLInputElement | null>(null);
  const reason = React.useRef<HTMLInputElement | null>(null);
  const currency = React.useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = React.useState<Errors>({});
  const [bindIndex, setBindIndex] = React.useState<number | null>(null);
  const [filteredBeneficiaries, setFilteredBeneficiaries] = React.useState<
    Beneficiary[]
  >([]);

  const currencyList: any[] = [];

  beneficiaries?.forEach(({ currency }) => {
    const index = currencyList.findIndex((item) => item.value === currency);
    if (index == -1) {
      currencyList.push({
        value: currency,
        label: `${currency}`,
        selectedLabel: currency,
        icon: <Flag country={currency.slice(0, -1).toLowerCase()} />,
      });
    }
  });

  const currencyChange: SelectChangeHandler = ({ selectedItem }) => {
    // TODO: probably shouldn't be clearing the filter on currency change
    search.current.value = "";

    setFilteredBeneficiaries(
      beneficiaries.filter((item) => item.currency == selectedItem.value)
    );
  };

  const toggleReason = (index: number) => {
    setErrors({ ...errors, reason: undefined });

    if (index === bindIndex) {
      setBindIndex(null);
    } else {
      setBindIndex(index);
    }
  };

  const searchBeneficiaries = (event: any) => {
    if (!event.target.value.length) {
      setFilteredBeneficiaries([]);
    } else {
      const searchFiltered = beneficiaries.filter(
        ({ account_name }) =>
          !account_name.toLowerCase().search(event.target.value.toLowerCase())
      );
      setFilteredBeneficiaries(searchFiltered);
    }
  };

  const handleSubmit = () => {
    if (!bindIndex) {
      setErrors({
        form: { message: "Choose a beneficiary or add a new one" },
      });

      return false;
    }

    if (!reason.current.value) {
      setErrors({
        reason: { message: "Select a reason" },
      });

      return false;
    }

    const selectedBeneficiary = beneficiaries[bindIndex];

    onComplete(selectedBeneficiary);
  };

  const BeneficiaryList = ({ data }) => {
    return (
      <div className="space-y-4">
        {data?.map((item: any, index: any) => (
          <div className="bg-gray-100" key={index}>
            <div className="grid grid-cols-4 gap-1 border-b border-gray-200 p-4">
              <div className="flex col-start-1 col-end-4">
                <div className="mr-4">
                  <div className="max-h-11">
                    <Flag
                      country={item.currency.slice(0, -1).toLowerCase()}
                      size="lg"
                    />
                  </div>

                  <p className="text-base text-gray-800 text-center">
                    {item.currency}
                  </p>
                </div>

                <div className="pt-2.5">
                  <span className="text-lg text-gray-600">
                    {item.account_name}
                  </span>

                  <div className="flex">
                    <div className="items-start mt-0.5">
                      <MailIcon width="18" />
                    </div>

                    <span className="text-gray-400 ml-3 items-start text-sm">
                      {item.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-1 flex justify-end flex-wrap content-center">
                <Toggle
                  id={index}
                  checked={bindIndex == index ? true : false}
                  onChange={() => toggleReason(index)}
                />
              </div>
            </div>

            {bindIndex == index && (
              <div className="p-4">
                <p className="text-lg text-gray-700 mb-2">
                  Reason for transfer
                </p>

                <Select
                  ref={reason}
                  name="reason"
                  placeholder="Please select a reason for this transfer"
                  options={reasons[client.cty_value]}
                  errors={errors}
                  // TODO: Add input for "Other"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
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
          <Input
            ref={search}
            name="search"
            placeholder="Search"
            onChange={searchBeneficiaries}
          />
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

      <BeneficiaryList
        data={
          filteredBeneficiaries.length ? filteredBeneficiaries : beneficiaries
        }
      />

      <div
        className={`flex border-b border-gray-200 pb-6 ${
          errors.form ? "justify-between" : "justify-end"
        }`}
      >
        {errors.form && (
          // TODO: export and import this from the desing system
          <Alert status={Alert.Status.CRITICAL} text={errors.form.message} />
        )}

        <Button
          size={Button.Size.MEDIUM}
          emphasis={Button.Emphasis.TRANSPARENT}
          onClick={addBeneficiary}
        >
          <PlusCircleIcon width="28" className="text-green-600" />
          Add a new beneficiary
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <Button
          size={Button.Size.LARGE}
          emphasis={Button.Emphasis.TRANSPARENT}
          onClick={() => stepBack(0)}
        >
          <ArrowLeftIcon width="16" />
          Back
        </Button>

        <Button size={Button.Size.LARGE} onClick={handleSubmit}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SelectBeneficiary;
