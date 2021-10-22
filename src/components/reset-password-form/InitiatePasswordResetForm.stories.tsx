import * as React from "react";
import { Story, Meta } from "@storybook/react";
import InitiatePasswordResetForm, {
  InitiatePasswordResetFormProps,
} from "./InitiatePasswordResetForm";

export default {
  title: "Components/InitiatePasswordResetForm",
  component: InitiatePasswordResetForm,
} as Meta;

const Template: Story<InitiatePasswordResetFormProps> = (args) => (
  <InitiatePasswordResetForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSuccess: () => null,
  onFailure: () => null,
};
