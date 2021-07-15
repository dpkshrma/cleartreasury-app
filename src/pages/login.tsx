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
  const userNewPassword = React.useRef<HTMLInputElement | null>(null);
  const userAuthCode = React.useRef<HTMLInputElement | null>(null);
  const passwordRegex =
    /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;

  function handleSubmit(e: any) {
    e.preventDefault();
    if (formState.formType == "signIn") {
      signIn();
    } else if (formState.formType == "confirmSignIn") {
      confirmSignIn();
    } else if (formState.formType == "newPasswordRequired") {
      setFormState(() => ({ ...formState, formType: "confirmSignIn" }));
      newPasswordRequired();
    }
  }

  async function signIn() {
    if (
      userEmail.current !== null &&
      userPassword.current.value.match(passwordRegex)
    ) {
      await Auth.signIn(
        userEmail.current.value,
        userPassword.current.value
      ).then((res: any) => {
        if (res.challengeName == "NEW_PASSWORD_REQUIRED") {
          setFormState(() => ({
            ...formState,
            formType: "newPasswordRequired",
          }));
          setUser(res);
        } else {
          setUser(res);
          setFormState(() => ({ ...formState, formType: "confirmSignIn" }));
        }
      });
    }
  }

  async function confirmSignIn() {
    const userData = await Auth.confirmSignIn(user, userAuthCode.current.value);

    setUser(userData);

    if (userData) {
      Router.push("/");
    }
  }

  async function newPasswordRequired() {
    if (userNewPassword.current.value.match(passwordRegex)) {
      const userData = await Auth.completeNewPassword(
        user,
        userNewPassword.current.value,
        { email: formState.email }
      );

      setUser(userData);
      setFormState(() => ({ ...formState, formType: "confirmSignIn" }));
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
            <form
              onSubmit={handleSubmit}
              className="flex justify-center flex-col"
            >
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
                      Forgot your password?
                    </a>
                  </Link>
                  <Button size={Button.Size.LARGE}>Sign in</Button>
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
                  <Button size={Button.Size.LARGE}>Sign in</Button>
                </React.Fragment>
              )}
              {formType === "newPasswordRequired" && (
                <React.Fragment>
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    ref={userNewPassword}
                  />
                  <Button size={Button.Size.LARGE}>Set new password</Button>
                </React.Fragment>
              )}
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

export default Login;
