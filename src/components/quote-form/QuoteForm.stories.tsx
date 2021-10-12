import * as React from "react";
import { Story, Meta } from "@storybook/react";
import QuoteForm, { QuoteFormData, QuoteFormProps } from "./QuoteForm";

export default {
  title: "Components/QuoteForm",
  component: QuoteForm,
  parameters: {
    actions: {
      handles: ["submit [data-event]"],
    },
  },
} as Meta;

const Template: Story<QuoteFormProps> = (args) => <QuoteForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  // eslint-disable-next-line no-console
  onComplete: (data: QuoteFormData) => console.log(data),
};
