import * as React from "react";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Button, Flag, Input, Select } from "@clear-treasury/design-system";
import { SelectChangeHandler } from "@clear-treasury/design-system/dist/components/select/Select";
import { Error } from "@clear-treasury/design-system/dist/components/form-field/FormField";
import { Client } from "../../pages/_app";
import { Beneficiary } from "./BeneficiaryForm";

// TODO: pull this from the API eventually
import currencies from "../../data/currencies.json";
import countries from "../../data/countries.json";
import reasons from "../../data/reasons.json";

type Errors = {
  nickname?: Error;
  email?: Error;
  currency?: Error;
  countries?: Error;
  account_name?: Error;
  bankname?: Error;
  address?: Error;
  account_number?: Error;
  swift?: Error;
  sort_code?: Error;
  iban?: Error;
  routing_number?: Error;
};

export interface AddBeneficiaryProps {
  client?: Client;
  onComplete?: (beneficiary: Beneficiary) => void;
  stepBack?: (stepNumber: number) => void;
  data: any;
}

const currencyList: any[] = currencies.map(({ CurrencyCode }) => ({
  value: CurrencyCode,
  label: `${CurrencyCode}`,
  selectedLabel: CurrencyCode,
  icon: <Flag country={CurrencyCode.slice(0, -1).toLowerCase()} />,
}));

const countriesList: any[] = countries.map(({ CountryName, ISO2 }) => ({
  value: CountryName,
  label: `${CountryName}`,
  selectedLabel: CountryName,
  icon: <Flag country={ISO2.toLowerCase()} />,
}));

const defaultValues = {
  currency: "GBP",
  country_code: "United Kingdom",
  reason: "Property Purchase",
};

const AddBeneficiaryForm = ({
  client,
  onComplete,
  stepBack,
  data,
}: AddBeneficiaryProps): JSX.Element => {
  const nickname = React.useRef<HTMLInputElement | null>(null);
  const email = React.useRef<HTMLInputElement | null>(null);
  const currency = React.useRef<HTMLInputElement | null>(null);
  const country_code = React.useRef<HTMLInputElement | null>(null);
  const account_name = React.useRef<HTMLInputElement | null>(null);
  const bankname = React.useRef<HTMLInputElement | null>(null);
  const address = React.useRef<HTMLInputElement | null>(null);
  const account_number = React.useRef<HTMLInputElement | null>(null);
  const swift = React.useRef<HTMLInputElement | null>(null);
  const sort_code = React.useRef<HTMLInputElement | null>(null);
  const iban = React.useRef<HTMLInputElement | null>(null);
  const routing_number = React.useRef<HTMLInputElement | null>(null);
  const reason = React.useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = React.useState<Errors>({});

  const [bankDetails, setBankDetails] = React.useState<string>(
    defaultValues.currency
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) return false;

    onComplete({
      nickname: nickname.current.value,
      email: email.current.value,
      currency: currency.current.value,
      country_code: country_code.current.value,
      account_name: account_name.current.value,
      bankname: bankname.current.value,
      address: address.current?.value,
      account_number: account_number.current?.value,
      swift: swift.current?.value,
      sort_code: sort_code.current?.value,
      iban: iban.current?.value,
      routing_number: routing_number.current?.value,
      reason: reason.current.value,
    });
  };

  const currencyChange: SelectChangeHandler = ({ selectedItem }) => {
    setBankDetails(selectedItem.value);
  };

  const validateForm = () => {
    const errors: Errors = {};
    const numberRegex = new RegExp(/^\d+$/);
    const swiftRegex = new RegExp(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/);
    const sortCodeRegex = new RegExp(
      /^(?!(?:0{6}|00-00-00))(?:\d{6}|\d\d-\d\d-\d\d)$/
    );
    const ibanRegex = new RegExp(
      /[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/
    );

    if (!nickname.current.value) {
      errors.nickname = { message: "You must enter this field" };
    }

    if (!email.current.value) {
      errors.email = { message: "You must enter this field" };
    }

    if (!account_name.current.value) {
      errors.account_name = { message: "You must enter this field" };
    }

    if (!bankname.current.value) {
      errors.bankname = { message: "You must enter this field" };
    }

    if (!account_number.current.value) {
      errors.account_number = { message: "You must enter this field" };
    } else if (!numberRegex.test(account_number.current.value)) {
      errors.account_number = { message: "Please check your account number" };
    }

    if (bankDetails === "USD") {
      if (!address.current.value) {
        errors.address = { message: "You must enter this field" };
      }

      if (!routing_number.current.value) {
        errors.routing_number = { message: "You must enter this field" };
      }
    }

    if (bankDetails === "GBP") {
      if (!sort_code.current.value) {
        errors.sort_code = { message: "You must enter this field" };
      } else if (!sortCodeRegex.test(sort_code.current.value)) {
        errors.sort_code = { message: "Please check your sort code" };
      }
    }

    if (bankDetails !== "GBP" && bankDetails !== "USD") {
      if (!swift.current.value) {
        errors.swift = { message: "You must enter this field" };
      } else if (!swiftRegex.test(swift.current.value)) {
        errors.swift = { message: "Please check your swift number" };
      }
    }

    if (!["GBP", "AUD", "NZD", "ZAR", "CA", "UGX"].includes(bankDetails)) {
      if (!iban.current.value) {
        errors.iban = { message: "You must enter this field" };
      } else if (!ibanRegex.exec(iban.current.value)) {
        errors.iban = { message: "Please check your iban number!" };
      }
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  React.useEffect(() => {
    if (data.beneficiary) {
      setBankDetails(data.beneficiary.currency);
    }
  }, [data.beneficiary]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="block w-full">
        <h2 className="text-theme-color-on-surface text-2xl">
          Beneficiary information
        </h2>

        <p className="text-l text-gray-500">
          Please provide details of the beneficiary
        </p>
      </div>

      <Input
        ref={nickname}
        type="text"
        name="nickname"
        label="Beneficiary name"
        placeholder="Enter the beneficiary name"
        hint="This is your reference for the account"
        errors={errors}
        value={data.beneficiary?.beneficiaryName}
      />

      <Input
        ref={email}
        type="email"
        name="email"
        label="Email address"
        placeholder="Enter their email address"
        errors={errors}
        value={data.beneficiary?.email}
      />

      <div className="grid grid-cols-2 gap-6 mb-8">
        <Select
          ref={currency}
          name="currencies"
          label="Currency"
          options={currencyList}
          defaultValue={
            data.beneficiary == undefined
              ? defaultValues.currency
              : data.beneficiary.currency
          }
          onChange={currencyChange}
        />

        <Select
          ref={country_code}
          name="countries"
          label="Destination country"
          options={countriesList}
          defaultValue={
            data.beneficiary == undefined
              ? defaultValues.country_code
              : data.beneficiary.country_code
          }
        />
      </div>

      <h2 className="text-2xl mb-2">Banking details</h2>

      <p className="text-l text-gray-500 mb-8">
        Please provide the beneficiaries banking details
      </p>

      <Input
        ref={account_name}
        type="text"
        name="account_name"
        label="Bank account name"
        placeholder="Bank account name"
        hint="This is the name as it appears on their bank account"
        errors={errors}
        value={data.beneficiary?.account_name}
      />

      <Input
        ref={bankname}
        type="text"
        name="bankname"
        label="Bank name"
        placeholder="Bank name"
        errors={errors}
        value={data.beneficiary?.bank_name}
      />

      {bankDetails === "USD" && (
        <Input
          ref={address}
          type="text"
          name="address"
          label="Bank address"
          placeholder="Bank address"
          errors={errors}
          value={data.beneficiary?.address}
        />
      )}

      <Input
        ref={account_number}
        type="text"
        name="account_number"
        label="Account number"
        placeholder="Account number"
        errors={errors}
        value={data.beneficiary?.account_number}
      />

      {bankDetails !== "GBP" && bankDetails !== "USD" && (
        <Input
          ref={swift}
          type="text"
          name="swift"
          label="Swift number"
          placeholder="Swift number"
          errors={errors}
          value={data.beneficiary?.swiftNumber}
        />
      )}
      {bankDetails === "GBP" && (
        <Input
          ref={sort_code}
          type="text"
          name="sort_code"
          label="Sort code"
          placeholder="Sort code"
          errors={errors}
          value={data.beneficiary?.sort_code}
        />
      )}

      {bankDetails !== "GBP" &&
        bankDetails !== "AUD" &&
        bankDetails !== "NZD" &&
        bankDetails !== "ZAR" &&
        bankDetails !== "CA" &&
        bankDetails !== "UGX" && (
          <Input
            ref={iban}
            type="text"
            name="iban"
            label="IBAN"
            placeholder="IBAN"
            errors={errors}
            value={data.beneficiary?.iban}
          />
        )}
      {bankDetails === "USD" && (
        <Input
          ref={routing_number}
          type="text"
          name="routing_number"
          label="Routing number"
          placeholder="Routing number"
          errors={errors}
          value={data.beneficiary?.routingNumber}
        />
      )}

      {/* // TODO: Beneficiary reason for transfer still TBD... */}
      <h2 className="text-2xl mb-2">Reason for transfer</h2>

      <p className="text-l text-gray-500 mb-8">
        Please provide a reason for your payments to this beneficiary
      </p>

      <div className="border-b border-gray-200 pb-8">
        <Select
          ref={reason}
          name="select"
          options={
            client.cty_value === "PRIVATE"
              ? reasons.OPTIONS_REASON_PERSONAL
              : reasons.OPTIONS_REASON_BUSINESS
          }
          defaultValue={
            data.beneficiary == undefined
              ? defaultValues.reason
              : data.beneficiary.reason
          }
        />
      </div>

      <div className="flex justify-between">
        <Button
          onClick={() => stepBack(0)}
          emphasis={Button.Emphasis.TRANSPARENT}
        >
          <ArrowLeftIcon width="16" />
          Back
        </Button>

        <Button size={Button.Size.LARGE}>Continue</Button>
      </div>
    </form>
  );
};

export default AddBeneficiaryForm;
