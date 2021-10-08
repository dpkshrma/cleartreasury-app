import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { LoginForm, LoginFormProps } from "./LoginForm";

const Template: Story<LoginFormProps> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
const defaultArgs: LoginFormProps = {
  formType: "signIn",
  loading: false,
  emailRef: React.createRef(),
  passwordRef: React.createRef(),
  newPasswordRef: React.createRef(),
  errors: {},
  onSubmit: () => {
    return;
  },
};
Default.args = defaultArgs;

export const NewPasswordForm = Template.bind({});
const newPasswordFormArgs: LoginFormProps = {
  formType: "newPasswordRequired",
  loading: false,
  emailRef: React.createRef(),
  passwordRef: React.createRef(),
  newPasswordRef: React.createRef(),
  errors: {},
  onSubmit: () => {
    return;
  },
};
NewPasswordForm.args = newPasswordFormArgs;

export const SignInForm = Template.bind({});
const signInFormArgs: LoginFormProps = {
  formType: "signIn",
  loading: false,
  emailRef: React.createRef(),
  passwordRef: React.createRef(),
  newPasswordRef: React.createRef(),
  errors: {},
  onSubmit: () => {
    return;
  },
};
SignInForm.args = signInFormArgs;

export default {
  title: "Components/LoginForm",
  component: LoginForm,
} as Meta;

export const ErrorForm = Template.bind({});
const errorFormArgs: LoginFormProps = {
  formType: "signIn",
  loading: false,
  emailRef: React.createRef(),
  passwordRef: React.createRef(),
  newPasswordRef: React.createRef(),
  errors: {
    alert: {
      message: "User does not exists",
    },
  },
  onSubmit: () => {
    return;
  },
};
ErrorForm.args = errorFormArgs;
