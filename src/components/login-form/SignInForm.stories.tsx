import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { SignInForm, SignInFormProps } from "./SignInForm";

const Template: Story<SignInFormProps> = (args) => <SignInForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
  emailRef: React.createRef(),
  passwordRef: React.createRef(),
  errors: {},
};

export default {
  title: "Components/SignInForm",
  component: SignInForm,
} as Meta;
