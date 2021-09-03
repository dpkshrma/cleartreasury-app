import * as React from "react";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Button, Flag, Input, Select } from "@clear-treasury/design-system";
import { Client } from "../../pages/_app";

// TODO: pull this from the API eventually
import currencies from "../../data/currencies.json";
import countries from "../../data/countries.json";
import { SelectChangeHandler } from "@clear-treasury/design-system/dist/components/select/Select";
// import reasons from "../../data/reasons.json";

type Error = {
  message: string;
};

type Errors = {
  beneficiaryName?: Error;
  email?: Error;
  currency?: Error;
  countries?: Error;
  account_name?: Error;
  bank_name?: Error;
  address?: Error;
  account_number?: Error;
  swiftNumber?: Error;
  sort_code?: Error;
  iban?: Error;
  routingNumber?: Error;
};

export interface AddBeneficiaryProps {
  client?: Client;
  onComplete?: (formData: AddBeneficiaryData) => void;
  stepBack?: (stepNumber: number) => void;
}

export interface AddBeneficiaryData {
  beneficiaryName?: string;
  email: string;
  currency: string;
  country_code: string;
  account_name?: string;
  bank_name?: string;
  address?: string;
  account_number?: string;
  swiftNumber?: string;
  sort_code?: string;
  iban?: string;
  routingNumber?: string;
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
};

const AddBeneficiaryForm = ({
  // client,
  onComplete,
  stepBack,
}: AddBeneficiaryProps): JSX.Element => {
  const beneficiaryName = React.useRef<HTMLInputElement | null>(null);
  const email = React.useRef<HTMLInputElement | null>(null);
  const currency = React.useRef<HTMLInputElement | null>(null);
  const country_code = React.useRef<HTMLInputElement | null>(null);
  const account_name = React.useRef<HTMLInputElement | null>(null);
  const bank_name = React.useRef<HTMLInputElement | null>(null);
  const address = React.useRef<HTMLInputElement | null>(null);
  const account_number = React.useRef<HTMLInputElement | null>(null);
  const swiftNumber = React.useRef<HTMLInputElement | null>(null);
  const sort_code = React.useRef<HTMLInputElement | null>(null);
  const iban = React.useRef<HTMLInputElement | null>(null);
  const routingNumber = React.useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = React.useState<Errors>({});

  const [bankDetails, setBankDetails] = React.useState<string>(
    defaultValues.currency
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) return false;

    onComplete({
      // TODO: add more details to this payload
      // beneficiaryName: beneficiaryName.current.value,
      email: email.current.value,
      currency: currency.current.value,
      country_code: country_code.current.value,
      account_name: account_name.current.value,
      bank_name: bank_name.current.value,
      address: address.current?.value,
      account_number: account_number.current?.value,
      swiftNumber: swiftNumber.current?.value,
      sort_code: sort_code.current?.value,
      iban: iban.current?.value,
      routingNumber: routingNumber.current?.value,
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

    if (!beneficiaryName.current.value) {
      errors.beneficiaryName = { message: "You must enter this field" };
    }

    if (!email.current.value) {
      errors.email = { message: "You must enter this field" };
    }

    if (!account_name.current.value) {
      errors.account_name = { message: "You must enter this field" };
    }

    if (!bank_name.current.value) {
      errors.bank_name = { message: "You must enter this field" };
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

      if (!routingNumber.current.value) {
        errors.routingNumber = { message: "You must enter this field" };
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
      if (!swiftNumber.current.value) {
        errors.swiftNumber = { message: "You must enter this field" };
      } else if (!swiftRegex.test(swiftNumber.current.value)) {
        errors.swiftNumber = { message: "Please check your swift number" };
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
        ref={beneficiaryName}
        type="text"
        name="beneficiaryName"
        label="Beneficiary name"
        placeholder="Enter the beneficiary name"
        hint="This is your reference for the account"
        errors={errors}
      />

      <Input
        ref={email}
        type="email"
        name="email"
        label="Email address"
        placeholder="Enter their email address"
        errors={errors}
      />

      <div className="grid grid-cols-2 gap-6 mb-8">
        <Select
          ref={currency}
          name="currencies"
          label="Currency"
          options={currencyList}
          defaultValue={defaultValues.currency}
          onChange={currencyChange}
        />
        <Select
          ref={country_code}
          name="countries"
          label="Destination country_code"
          options={countriesList}
          defaultValue={defaultValues.country_code}
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
      />

      <Input
        ref={bank_name}
        type="text"
        name="bank_name"
        label="Bank name"
        placeholder="Bank name"
        errors={errors}
      />

      {bankDetails === "USD" && (
        <Input
          ref={address}
          type="text"
          name="address"
          label="Bank address"
          placeholder="Bank address"
          errors={errors}
        />
      )}
      <Input
        ref={account_number}
        type="text"
        name="account_number"
        label="Account number"
        placeholder="Account number"
        errors={errors}
      />

      {bankDetails !== "GBP" && bankDetails !== "USD" && (
        <Input
          ref={swiftNumber}
          type="text"
          name="swiftNumber"
          label="Swift number"
          placeholder="Swift number"
          errors={errors}
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
          />
        )}
      {bankDetails === "USD" && (
        <Input
          ref={routingNumber}
          type="text"
          name="routingNumber"
          label="Routing number"
          placeholder="Routing number"
          errors={errors}
        />
      )}

      {/* 
        // TODO: Beneficiary reason for transfer still TBD...
        <h2 className="text-2xl mb-2">Reason for transfer</h2>

        <p className="text-l text-gray-500 mb-8">
          Please provide a reason for your payments to this beneficiary
        </p>

        <div className="border-b border-gray-200 pb-8">
          <Select
            name="select"
            options={
              client.cty_value === "PRIVATE"
                ? reasons.OPTIONS_REASON_PERSONAL
                : reasons.OPTIONS_REASON_BUSINESS
            }
          /> 
        </div>
      */}

      {/* TODO: Not sure <hr /> is the best/right way to do this */}
      <hr className="pb-2" />

      <div className="flex justify-between">
        <Button
          size={Button.Size.SMALL}
          emphasis={Button.Emphasis.GHOST}
          onClick={() => stepBack(0)}
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
