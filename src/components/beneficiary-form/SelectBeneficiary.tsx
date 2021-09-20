import { Button, Flag, Input, Select } from "@clear-treasury/design-system";
import * as React from "react";
import { Client } from "../../pages/_app";
import Toggle from "../toggle/Toggle";
import reasons from "../../data/reasons.json";
import { SelectChangeHandler } from "@clear-treasury/design-system/dist/components/select/Select";
import { ArrowLeftIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { MailIcon } from "@heroicons/react/outline";
import { GET_BENEFICIARIES } from "../../graphql/beneficiaries/queries";
import { useQuery } from "../../hooks/useQuery";
export interface SelectBeneficiaryProps {
  client?: Client;
  stepBack?: (stepNumber: number) => void;
}
interface Beneficiary {
  intermediary: string;
  account_name: string;
  account_number: string;
  address: string;
  bankname: string;
  currency: string;
  notes: string;
  sort_code: string;
  swift: string;
  country_code: string;
  email: string;
  ben_address: string;
  id: string;
  client_ref: string;
}

const SelectBeneficiary = ({
  client,
  stepBack,
}: SelectBeneficiaryProps): JSX.Element => {
  const search = React.useRef<HTMLInputElement | null>(null);
  const currency = React.useRef<HTMLInputElement | null>(null);
  const [beneficiaries, setBeneficiaries] = React.useState<
    Beneficiary[] | null
  >([]);
  const [filtered, setFiltered] = React.useState<boolean>(false);
  const [filteredBeneficiaries, setFilteredBeneficiaries] = React.useState<
    Beneficiary[] | null
  >([]);
  const [bindIndex, setBindIndex] = React.useState(null);
  const currencyList: any[] = [];

  beneficiaries.map(({ currency }) => {
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
    search.current.value = "";
    setFiltered(true);
    setFilteredBeneficiaries(
      beneficiaries.filter((item) => item.currency == selectedItem.value)
    );
  };

  const { data: beneficiariesList } = useQuery(GET_BENEFICIARIES, {
    client_ref: "123456",
  });

  React.useEffect(() => {
    if (beneficiariesList !== null) {
      setBeneficiaries(beneficiariesList);
    }
  }, [beneficiariesList]);

  const toggleReason = (index) => {
    if (index == bindIndex) {
      setBindIndex(null);
    } else {
      setBindIndex(index);
    }
  };

  const searchBeneficiaries = (event: any) => {
    if (event.target.value.length == 0) {
      setFiltered(false);
    } else if (filtered) {
      const searchFiltered = filteredBeneficiaries.filter(
        ({ account_name }) =>
          !account_name.toLowerCase().search(event.target.value.toLowerCase())
      );
      setFilteredBeneficiaries(searchFiltered);
    } else {
      setFiltered(true);
      const searchFiltered = beneficiaries.filter(
        ({ account_name }) =>
          !account_name.toLowerCase().search(event.target.value.toLowerCase())
      );
      setFilteredBeneficiaries(searchFiltered);
    }
  };

  const BeneficiaryList = ({ data }) => {
    return (
      <React.Fragment>
        {data.map((item: any, index: any) => (
          <div className="bg-gray-100" key={index}>
            <div className="grid grid-cols-4 gap-1 border-b border-gray-200 p-4">
              <div className="flex col-start-1 col-end-4">
                <div className="mr-4">
                  <div className="max-h-11">
                    <Flag country={item.country_code.toLowerCase()} size="lg" />
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
        ))}
      </React.Fragment>
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
            onChange={(event) => searchBeneficiaries(event)}
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
        data={filtered ? filteredBeneficiaries : beneficiaries}
      />
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
