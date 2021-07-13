import React from "react";
import Link from "next/link";
import Router from "next/router";
import { Auth, withSSRContext } from "aws-amplify";
import { Button, Input } from "@clear-treasury/design-system";
import Page from "../components/page/Page";

const initialFormState = {
  password: "",
  email: "",
  authCode: "",
  formType: "signIn",
};

function Login() {
  const [user, setUser] = React.useState();
  const [formState, setFormState] = React.useState(initialFormState);
  const { formType } = formState;
  const userEmail = React.useRef<HTMLInputElement | null>(null);
  const userPassword = React.useRef<HTMLInputElement | null>(null);
  const userAuthCode = React.useRef<HTMLInputElement | null>(null);

  async function signIn() {
    if (userEmail.current !== null && userPassword.current !== null) {
      const user = await Auth.signIn(
        userEmail.current.value,
        userPassword.current.value
      );

      setUser(user);
      setFormState(() => ({ ...formState, formType: "confirmSignIn" }));
    }
  }

  async function confirmSignIn() {
    const success = await Auth.confirmSignIn(user, userAuthCode.current.value);
    setFormState(() => ({ ...formState, formType: "signedIn" }));

    if (success) {
      Router.push("/");
    }
  }

  return (
    <Page>
      <div className="login-wrapper h-screen flex w-full bg-teal-700">
        <div className="max-w-md w-full m-auto p-0">
          <img
            className="h-12 w-full mb-8"
            src="/clear_full_logo_light.svg"
            alt="Clear Currency"
          />
          <div className="p-6 bg-white rounded-md flex justify-center flex-col shadow-md">
            <h1 className="block w-full text-center mb-6 text-gray-800 text-2xl">
              Sign in to your account
            </h1>
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
                <Link href="/resettingpassword">
                  <a className="text-gray-600 text-sm mb-16 cursor-pointer">
                    Reset Password
                  </a>
                </Link>
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

export default Login;
