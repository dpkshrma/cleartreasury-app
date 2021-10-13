import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { SignInForm, SignInFormProps } from "./SignInForm";
import { FormType } from "./types";

const Template: Story<SignInFormProps> = (args) => <SignInForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
  errors: {},
  formType: FormType.signInForm,
};

export default {
  title: "Components/SignInForm",
  component: SignInForm,
} as Meta;
