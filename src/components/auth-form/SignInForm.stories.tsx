import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { SignInForm, SignInFormProps } from "./SignInForm";

const Template: Story<SignInFormProps> = (args) => <SignInForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
  errors: {},
  formType: "signInForm",
};

export default {
  title: "Components/SignInForm",
  component: SignInForm,
} as Meta;
