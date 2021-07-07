import { Button, Input } from "@clear-treasury/design-system";
import Link from "next/link";
import React from "react";
import Page from "../components/page/Page";
import { Auth } from "aws-amplify";

const initialFormState = {
  username: "",
  password: "",
  email: "",
  authCode: "",
  formType: "signIn",
};

function Login() {
  const [formState, setFormState] = React.useState(initialFormState);
  const [user, setUser] = React.useState(null);
  const userEmail = React.useRef<HTMLInputElement | null>(null);
  const userPassword = React.useRef<HTMLInputElement | null>(null);
  const userAuthCode = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
      setFormState(() => ({ ...formState, formType: "signedIn" }));
    } catch (error) {
      setUser(null);
    }
  }

  const { formType } = formState;

  async function signIn() {
    await Auth.signIn(userEmail.current.value, userPassword.current.value).then(
      (res: any) => {
        setUser(res);
      }
    );
    setFormState(() => ({ ...formState, formType: "confirmSignIn" }));
  }

  async function confirmSignIn() {
    const { authCode } = formState;
    const { username, challengeName } = user;
    await Auth.confirmSignIn(username, authCode, challengeName);
    setFormState(() => ({ ...formState, formType: "signedIn" }));
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
                <Link href="/">
                  <a href="#" className="text-gray-600 text-sm mb-16">
                    Forgot your password?
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
