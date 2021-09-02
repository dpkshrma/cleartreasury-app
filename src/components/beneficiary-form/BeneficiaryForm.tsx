import { Button, Flag, Input, Select } from "@clear-treasury/design-system";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import * as React from "react";

// TODO: pull this back from the API eventually
import currencies from "./data/currencies.json";
import countries from "./data/countries.json";
// eslint-disable-next-line
import reasons from "./data/reasons.json";
import { Client } from "../../pages/_app";

type Error = {
  message: string;
};

type Errors = {
  beneficiaryName?: Error;
  email?: Error;
  currency?: Error;
  countries?: Error;
  bankAccountName?: Error;
  bankName?: Error;
  bankAddress?: Error;
  accountNumber?: Error;
  swiftNumber?: Error;
  sortCode?: Error;
  iban?: Error;
  routingNumber?: Error;
};

export interface BeneficiaryFormData {
  beneficiaryName: string;
  email: string;
  currency: string;
  country: string;
  bankAccountName?: string;
  bankName?: string;
  bankAddress?: string;
  accountNumber?: string;
  swiftNumber?: string;
  sortCode?: string;
  iban?: string;
  routingNumber?: string;
  errors: Errors;
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
  country: "United Kingdom",
};

export interface BeneficiaryFormProps {
  client?: Client;
  onComplete?: (formData: BeneficiaryFormData) => void;
  stepBack?: (stepNumber: number) => void;
}

const BeneficiaryForm = ({
  // eslint-disable-next-line
  client,
  onComplete,
  stepBack,
}: BeneficiaryFormProps): JSX.Element => {
  const beneficiaryName = React.useRef<HTMLInputElement | null>(null);
  const email = React.useRef<HTMLInputElement | null>(null);
  const currency = React.useRef<HTMLInputElement | null>(null);
  const country = React.useRef<HTMLInputElement | null>(null);
  const bankAccountName = React.useRef<HTMLInputElement | null>(null);
  const bankName = React.useRef<HTMLInputElement | null>(null);
  const bankAddress = React.useRef<HTMLInputElement | null>(null);
  const accountNumber = React.useRef<HTMLInputElement | null>(null);
  const swiftNumber = React.useRef<HTMLInputElement | null>(null);
  const sortCode = React.useRef<HTMLInputElement | null>(null);
  const iban = React.useRef<HTMLInputElement | null>(null);
  const routingNumber = React.useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = React.useState<BeneficiaryFormData>({
    beneficiaryName: "",
    email: "",
    country: defaultValues.country,
    currency: defaultValues.currency,
    errors: {},
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) return false;

    onComplete(formData);
  };

  const currencyChange = () => {
    setFormData({
      ...formData,
      currency: currency.current.value,
    });
  };

  const validateForm = () => {
    const errors: Errors = {};
    const ibanRegex = new RegExp(
      /[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/
    );
    const numberRegex = new RegExp(/^\d+$/);
    const swiftRegex = new RegExp(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/);
    const sortCodeRegex = new RegExp(
      /^(?!(?:0{6}|00-00-00))(?:\d{6}|\d\d-\d\d-\d\d)$/
    );

    if (!beneficiaryName.current.value) {
      errors.beneficiaryName = { message: "You must enter this field" };
    }

    if (!email.current.value) {
      errors.email = { message: "You must enter this field" };
    }

    if (!bankAccountName.current.value) {
      errors.bankAccountName = { message: "You must enter this field" };
    }

    if (!bankName.current.value) {
      errors.bankName = { message: "You must enter this field" };
    }

    if (!accountNumber.current.value) {
      errors.accountNumber = { message: "You must enter this field" };
    } else if (!numberRegex.test(accountNumber.current.value)) {
      errors.accountNumber = { message: "Please check your account number" };
    }

    if (formData.currency == "USD") {
      if (!bankAddress.current.value) {
        errors.bankAddress = { message: "You must enter this field" };
      }

      if (!routingNumber.current.value) {
        errors.routingNumber = { message: "You must enter this field" };
      }
    }

    if (formData.currency == "GBP") {
      if (!sortCode.current.value) {
        errors.sortCode = { message: "You must enter this field" };
      } else if (!sortCodeRegex.test(sortCode.current.value)) {
        errors.sortCode = { message: "Please check your sort code" };
      }
    }

    if (formData.currency !== "GBP" && formData.currency !== "USD") {
      if (!swiftNumber.current.value) {
        errors.swiftNumber = { message: "You must enter this field" };
      } else if (!swiftRegex.test(swiftNumber.current.value)) {
        errors.swiftNumber = { message: "Please check your swift number" };
      }
    }

    if (
      formData.currency !== "GBP" &&
      formData.currency !== "AUD" &&
      formData.currency !== "NZD" &&
      formData.currency !== "ZAR" &&
      formData.currency !== "CA" &&
      formData.currency !== "UGX"
    ) {
      if (!iban.current.value) {
        errors.iban = { message: "You must enter this field" };
      } else if (!ibanRegex.exec(iban.current.value)) {
        errors.iban = { message: "Please check your iban number!" };
      }
    }

    if (Object.keys(errors).length) {
      setFormData({ ...formData, errors });
      return false;
    } else {
      setFormData({ ...formData, errors: {} });
      return true;
    }
  };

  return (
    <div className="bg-white py-10">
      <div className="max-w-xl w-full m-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl mb-2">Beneficiary information</h2>
          <p className="text-l text-gray-500 mb-8">
            Please provide details of the beneficiary
          </p>
          <div className="mb-8">
            <Input
              ref={beneficiaryName}
              type="text"
              name="beneficiaryName"
              label="Beneficiary name"
              placeholder="Enter the beneficiary name"
              hint="This is your reference for the account"
              errors={formData.errors}
            />
          </div>
          <div className="mb-8">
            <Input
              ref={email}
              type="email"
              name="email"
              label="Email address"
              placeholder="Enter their email address"
              errors={formData.errors}
            />
          </div>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <Select
                ref={currency}
                name="currencies"
                label="Currency"
                options={currencyList}
                defaultValue={defaultValues.currency}
                onChange={() => currencyChange()}
              />
            </div>
            <div>
              <Select
                ref={country}
                name="countries"
                label="Destination country"
                options={countriesList}
                defaultValue={defaultValues.country}
              />
            </div>
          </div>
          <h2 className="text-2xl mb-2">Banking details</h2>
          <p className="text-l text-gray-500 mb-8">
            Please provide the beneficiaries banking details
          </p>
          <div className="mb-8">
            <Input
              ref={bankAccountName}
              type="text"
              name="bankAccountName"
              label="Bank account name"
              placeholder="Bank account name"
              hint="This is the name as it appears on their bank account"
              errors={formData.errors}
            />
          </div>
          <div className="mb-8">
            <Input
              ref={bankName}
              type="text"
              name="bankName"
              label="Bank name"
              placeholder="Bank name"
              errors={formData.errors}
            />
          </div>
          {formData.currency == "USD" && (
            <div className="mb-8">
              <Input
                ref={bankAddress}
                type="text"
                name="bankAddress"
                label="Bank address"
                placeholder="Bank address"
                errors={formData.errors}
              />
            </div>
          )}
          <div className="mb-8">
            <Input
              ref={accountNumber}
              type="text"
              name="accountNumber"
              label="Account number"
              placeholder="Account number"
              errors={formData.errors}
            />
          </div>
          {formData.currency !== "GBP" && formData.currency !== "USD" && (
            <div className="mb-8">
              <Input
                ref={swiftNumber}
                type="text"
                name="swiftNumber"
                label="Swift number"
                placeholder="Swift number"
                errors={formData.errors}
              />
            </div>
          )}
          {formData.currency == "GBP" && (
            <div className="mb-8">
              <Input
                ref={sortCode}
                type="text"
                name="sortCode"
                label="Sort code"
                placeholder="Sort code"
                errors={formData.errors}
              />
            </div>
          )}
          {formData.currency !== "GBP" &&
            formData.currency !== "AUD" &&
            formData.currency !== "NZD" &&
            formData.currency !== "ZAR" &&
            formData.currency !== "CA" &&
            formData.currency !== "UGX" && (
              <div className="mb-8">
                <Input
                  ref={iban}
                  type="text"
                  name="iban"
                  label="IBAN"
                  placeholder="IBAN"
                  errors={formData.errors}
                />
              </div>
            )}
          {formData.currency == "USD" && (
            <div className="mb-8">
              <Input
                ref={routingNumber}
                type="text"
                name="routingNumber"
                label="Routing number"
                placeholder="Routing number"
                errors={formData.errors}
              />
            </div>
          )}
          <h2 className="text-2xl mb-2">Reason for transfer</h2>
          <p className="text-l text-gray-500 mb-8">
            Please provide a reason for your payments to this beneficiary
          </p>
          <div className="border-b border-gray-200 pb-8">
            {/* <Select
              name="select"
              options={
                client.cty_value == "PRIVATE"
                  ? reasons.OPTIONS_REASON_PERSONAL
                  : reasons.OPTIONS_REASON_BUSINESS
              }
            /> */}
          </div>
          <div className="py-8 flex justify-between">
            <Button
              emphasis={Button.Emphasis.GHOST}
              size={Button.Size.SMALL}
              onClick={() => stepBack(0)}
            >
              <ArrowLeftIcon width="16" />
              Back
            </Button>
            <Button size={Button.Size.LARGE}>Continue</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeneficiaryForm;
