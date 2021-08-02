import * as React from "react";
import Link from "next/link";
import { Auth } from "aws-amplify";
import { Button, Input } from "@clear-treasury/design-system";
import Page from "../components/page/Page";

const initialFormState = {
  password: "",
  email: "",
  passwordCode: "",
  newPassword: "",
  formType: "resetPassword",
};

const ResetPassword = (): JSX.Element => {
  const [formState, setFormState] = React.useState(initialFormState);
  const { formType } = formState;
  const userEmail = React.useRef<HTMLInputElement | null>(null);
  const userPasswordCode = React.useRef<HTMLInputElement | null>(null);
  const userNewPassword = React.useRef<HTMLInputElement | null>(null);

  async function sendResetCode() {
    await Auth.forgotPassword(userEmail.current.value).then(() => {
      setFormState(() => ({ ...formState, formType: "codeSend" }));
    });
  }

  async function resetPassword() {
    await Auth.forgotPasswordSubmit(
      userEmail.current.value,
      userPasswordCode.current.value,
      userNewPassword.current.value
    ).then(() => {
      setFormState(() => ({ ...formState, formType: "signIn" }));
    });
  }

  return (
    <Page backgroundColor={Page.Color.TEAL}>
      <div className="max-w-md w-full m-auto p-0">
        <img
          className="h-12 w-full mb-8"
          src="/clear_full_logo_light.svg"
          alt="Clear Currency"
        />
        <div className="p-6 bg-white rounded-md flex justify-center flex-col shadow-md">
          <h1 className="block w-full text-center mb-6 text-gray-800 text-2xl">
            Reset your password
          </h1>
          <Input
            name="email"
            type="email"
            label="Email address"
            placeholder="Enter your email"
            ref={userEmail}
          />
          {formType === "resetPassword" && (
            <React.Fragment>
              <Link href="/login">
                <a className="text-gray-600 text-sm mb-16 cursor-pointer">
                  Back to Sign In
                </a>
              </Link>
              <Button size={Button.Size.LARGE} onClick={sendResetCode}>
                Send Code
              </Button>
            </React.Fragment>
          )}
          {formType === "codeSend" && (
            <React.Fragment>
              <Input
                name="passwordCode"
                type="text"
                label="Enter verification code"
                placeholder="Enter your code"
                ref={userPasswordCode}
              />
              <Input
                name="newPassword"
                type="password"
                label="Enter new password"
                placeholder="Enter your new password"
                ref={userNewPassword}
              />
              <Button size={Button.Size.LARGE} onClick={resetPassword}>
                Send Code
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    </Page>
  );
};

export default ResetPassword;
