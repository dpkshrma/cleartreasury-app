import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { NewPasswordForm, NewPasswordFormProps } from "./NewPasswordForm";

const Template: Story<NewPasswordFormProps> = (args) => (
  <NewPasswordForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  loading: false,
  errors: {},
  formType: "newPasswordForm",
};

export default {
  title: "Components/NewPasswordForm",
  component: NewPasswordForm,
} as Meta;
