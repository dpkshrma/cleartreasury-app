import React from "react";
import Router from "next/router";
import { Auth, withSSRContext } from "aws-amplify";
import { Button, Input, Alert } from "@clear-treasury/design-system";
import { InformationCircleIcon } from "@heroicons/react/outline";
import Page from "../components/page/Page";

const initialFormState = {
  email: "",
  verificationCode: "",
  password: "",
  authCode: "",
  formType: "verify",
  error: false,
  errorMessage: "",
};

function Verify() {
  const [user, setUser] = React.useState(null);
  const [formState, setFormState] = React.useState(initialFormState);
  const [loading, setLoading] = React.useState(false);

  const { formType } = formState;

  const userEmail = React.useRef<HTMLInputElement | null>(null);
  const verificationCode = React.useRef<HTMLInputElement | null>(null);
  const newPassword = React.useRef<HTMLInputElement | null>(null);
  const userAuthCode = React.useRef<HTMLInputElement | null>(null);

  function handleSubmit(e: any) {
    e.preventDefault();

    if (formState.formType == "verify") {
      signIn();
    } else if (formState.formType == "confirmSignIn") {
      confirmSignIn();
    } else if (formState.formType == "newPasswordRequired") {
      newPasswordRequired();
    }
  }

  async function signIn() {
    if (userEmail.current !== null && verificationCode.current) {
      setLoading(true);
      try {
        const res = await Auth.signIn(
          userEmail.current.value,
          verificationCode.current.value
        );

        if (res.challengeName == "NEW_PASSWORD_REQUIRED") {
          setFormState(() => ({
            ...formState,
            error: false,
            formType: "newPasswordRequired",
          }));
          setUser(res);
          setLoading(false);
        } else {
          setUser(res);
          setFormState(() => ({ ...formState, formType: "confirmSignIn" }));
          setLoading(false);
        }
      } catch (err) {
        if (err.message.includes("Incorrect username or password")) {
          err.message = "Invalid verification code";
        }

        setFormState(() => ({
          ...formState,
          error: true,
          errorMessage: err.message,
        }));

        setLoading(false);
      }
    }
  }

  async function newPasswordRequired() {
    setLoading(true);

    try {
      const userData = await Auth.completeNewPassword(
        user,
        newPassword.current.value,
        { email: userEmail.current.value }
      );

      setUser(userData);
      setFormState(() => ({
        ...formState,
        error: false,
        formType: "confirmSignIn",
      }));
      setLoading(false);
    } catch (err) {
      setFormState({
        ...formState,
        error: true,
        errorMessage: err.message,
      });

      setLoading(false);
    }
  }

  const resendCode = (e) => {
    e.preventDefault();
  };

  async function confirmSignIn() {
    setLoading(true);

    try {
      const userData = await Auth.confirmSignIn(
        user,
        userAuthCode.current.value
      );

      setUser(userData);
      Router.push("/");
    } catch (err) {
      setFormState({
        ...formState,
        error: true,
        errorMessage: err.message,
      });

      setLoading(false);
    }
  }

  const VerifyForm = () => (
    <>
      <Input
        name="verificationCode"
        type="verificationCode"
        label="Verification code"
        placeholder="Enter your code"
        ref={verificationCode}
      />

      <Button size={Button.Size.LARGE} loading={loading}>
        Verify
      </Button>
    </>
  );

  const SetPasswordForm = () => (
    <>
      <Input
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your new password"
        hint="Passwords should be 8 characters or more and contain at least one number and one special character"
        ref={newPassword}
      />

      <Button size={Button.Size.LARGE} loading={loading}>
        Set password
      </Button>
    </>
  );

  const AuthenticateForm = () => (
    <>
      <Input
        name="authCode"
        label="Authentication code"
        placeholder="Enter your code"
        ref={userAuthCode}
      />

      <a href="#" onClick={resendCode} className="text-green-600 text-sm mb-6">
        Resend code
      </a>

      <Button size={Button.Size.LARGE} loading={loading}>
        Sign in
      </Button>
    </>
  );

  const title = {
    verify: "Sign in to your account",
    confirmSignIn: "Enter authentication code",
    newPasswordRequired: "Set your password",
  };

  return (
    <Page>
      <div className="h-screen flex w-full bg-teal-700">
        <div className="max-w-md w-full m-auto p-0">
          <img
            className="h-12 w-full mb-8"
            src="/clear_full_logo_light.svg"
            alt="Clear Currency"
          />

          <div className="p-6 bg-white rounded-md flex justify-center flex-col shadow-md">
            <h1 className="block w-full text-center mb-6 text-gray-800 text-2xl">
              {title[formType]}
            </h1>

            <form
              onSubmit={handleSubmit}
              className="flex justify-center flex-col space-y-6"
            >
              {formState.error && (
                <Alert
                  text={formState.errorMessage}
                  status={Alert.Status.CRITICAL}
                />
              )}

              {formType === "confirmSignIn" && (
                <Alert
                  text={`A code has been sent to your phone number ending in ${user?.challengeParam?.CODE_DELIVERY_DESTINATION.substr(
                    -7
                  )}`}
                  status={Alert.Status.PRIMARY}
                  icon={InformationCircleIcon}
                />
              )}

              {formType !== "confirmSignIn" && (
                <Input
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="Enter your email"
                  disabled={
                    formType === ("newPasswordRequired" || "confirmSignIn")
                  }
                  ref={userEmail}
                />
              )}

              {formType === "verify" && <VerifyForm />}
              {formType === "newPasswordRequired" && <SetPasswordForm />}
              {formType === "confirmSignIn" && <AuthenticateForm />}
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
}

export async function getServerSideProps({ req }) {
  const { Auth } = withSSRContext({ req });

  try {
    await Auth.currentAuthenticatedUser();

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } catch (err) {
    return {
      props: {
        authenticated: false,
        user: null,
      },
    };
  }
}

export default Verify;
