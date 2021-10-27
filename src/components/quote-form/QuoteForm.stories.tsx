import * as React from "react";
import { Story, Meta } from "@storybook/react";
import QuoteForm, { QuoteFormProps } from "./QuoteForm";

export default {
  title: "Components/QuoteForm",
  component: QuoteForm,
  argTypes: { onComplete: { action: "complete" } },
} as Meta;

const Template: Story<QuoteFormProps> = (args) => <QuoteForm {...args} />;

export const Default = Template.bind({});
