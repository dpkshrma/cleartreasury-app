import { Button, Input } from "@clear-treasury/design-system";
import Link from "next/link";
import React from "react";
import Page from "../components/page/Page";
import { Auth } from "aws-amplify";

const initialFormState = {
  password: "",
  email: "",
  authCode: "",
  passwordCode: "",
  newPassword: "",
  formType: "signIn",
};

function Login() {
  const [formState, setFormState] = React.useState(initialFormState);
  const { formType } = formState;
  const userEmail = React.useRef<HTMLInputElement | null>(null);
  const userPassword = React.useRef<HTMLInputElement | null>(null);
  const userAuthCode = React.useRef<HTMLInputElement | null>(null);
  const userPasswordCode = React.useRef<HTMLInputElement | null>(null);
  const userNewPassword = React.useRef<HTMLInputElement | null>(null);

  async function signIn() {
    if (userEmail.current !== null && userPassword.current !== null) {
      await Auth.signIn(
        userEmail.current.value,
        userPassword.current.value
      ).then(() => {
        setFormState(() => ({ ...formState, formType: "confirmSignIn" }));
      });
    }
  }

  async function confirmSignIn() {
    await Auth.confirmSignIn(
      userEmail.current.value,
      userAuthCode.current.value
    );
    setFormState(() => ({ ...formState, formType: "signedIn" }));
  }

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
    <Page>
      <div className="login-wrapper h-screen flex w-full bg-teal-700">
        <div className="login-form m-auto p-0">
          <img
            className="h-12 w-full mb-8"
            src="/clear_full_logo_light.svg"
            alt="Clear Currency"
          />
          <div className="p-6 bg-white rounded-md flex justify-center flex-col shadow-md">
            {formType === "signIn" && (
              <h1 className="block w-full text-center mb-6 text-gray-800 text-2xl">
                Sign in to your account
              </h1>
            )}
            {formType === "resetPassword" && (
              <h1 className="block w-full text-center mb-6 text-gray-800 text-2xl">
                Reset your password
              </h1>
            )}
            <Input
              name="email"
              type="email"
              label="Email address"
              placeholder="Enter your email"
              ref={userEmail}
            />
            {formType === "signIn" && (
              <React.Fragment>
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  ref={userPassword}
                />
                <span
                  className="text-gray-600 text-sm mb-16 cursor-pointer"
                  onClick={() =>
                    setFormState(() => ({
                      ...formState,
                      formType: "resetPassword",
                    }))
                  }
                >
                  Reset Password
                </span>
                <Button size={Button.Size.LARGE} onClick={signIn}>
                  Sign in
                </Button>
              </React.Fragment>
            )}
            {formType === "confirmSignIn" && (
              <React.Fragment>
                <Input
                  name="authCode"
                  type="text"
                  label="Enter verification code"
                  placeholder="Enter your code"
                  ref={userAuthCode}
                />
                <Link href="/">
                  <a href="#" className="text-gray-600 text-sm mb-16">
                    Resend verification code
                  </a>
                </Link>
                <Button size={Button.Size.LARGE} onClick={confirmSignIn}>
                  Sign in
                </Button>
              </React.Fragment>
            )}
            {formType === "resetPassword" && (
              <React.Fragment>
                <span
                  className="text-gray-600 text-sm mb-16 cursor-pointer"
                  onClick={() =>
                    setFormState(() => ({ ...formState, formType: "signIn" }))
                  }
                >
                  Back to Sign In
                </span>
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
            {formType === "signedIn" && (
              <React.Fragment>welcome to the board</React.Fragment>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Login;
