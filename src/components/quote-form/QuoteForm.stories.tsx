import React from "react";
import { Story, Meta } from "@storybook/react";
import currencyPairs from "./data/currency-pairs.json";
import QuoteForm, { QuoteFormProps } from "./QuoteForm";

const currencies = currencyPairs.map(
  ({ currencyCode }: { currencyCode: any }) => {
    const countryCode = currencyCode.slice(0, -1).toLowerCase();

    return {
      value: currencyCode,
      label: `${currencyCode}`,
      selectedLabel: currencyCode,
      icon: (
        <span
          className={`flag-icon-background flag-icon-${countryCode} pl-8 bg-left bg-contain`}
        />
      ),
    };
  }
);

export default {
  title: "Components/QuoteForm",
  component: QuoteForm,
} as Meta;

const Template: Story<QuoteFormProps> = (args) => <QuoteForm {...args} />;

export const Default = Template.bind({ currencies: currencies });

Default.args = {
  title: "How much would you like to transfer?",
  currencies: currencies,
};
