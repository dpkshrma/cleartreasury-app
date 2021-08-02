import * as React from "react";
import Link from "next/link";
import Router from "next/router";
import { GetServerSideProps } from "next";
import { CognitoUser } from "@aws-amplify/auth";
import { Auth, withSSRContext } from "aws-amplify";
import { Button, Input, Alert } from "@clear-treasury/design-system";
import Page from "../components/page/Page";

type Error = {
  message: string;
};

type Errors = {
  alert?: Error;
  email?: Error;
  password?: Error;
  newPassword?: Error;
};

interface FormState {
  formType: "signIn" | "newPasswordRequired";
  errors: Errors;
}

type Props = {
  setContext: (user: CognitoUser) => void;
};

const Login = (props: Props): JSX.Element => {
  const [user, setUser]: any = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [formState, setFormState] = React.useState<FormState>({
    formType: "signIn",
    errors: {},
  });

  const userEmail = React.useRef<HTMLInputElement | null>(null);
  const userPassword = React.useRef<HTMLInputElement | null>(null);
  const userNewPassword = React.useRef<HTMLInputElement | null>(null);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) return false;

    if (formState.formType == "signIn") {
      signIn();
    } else if (formState.formType == "newPasswordRequired") {
      newPasswordRequired();
    }
  }

  function validateForm() {
    const errors: Errors = {};

    if (!userEmail?.current?.value) {
      errors.email = { message: "You must enter an email" };
    }

    if (formState.formType === "signIn" && !userPassword?.current?.value) {
      errors.password = {
        message: "You must enter a password",
      };
    }

    if (
      formState.formType === "newPasswordRequired" &&
      !userNewPassword?.current?.value
    ) {
      errors.newPassword = { message: "You must enter a password" };
    }

    if (Object.keys(errors).length) {
      setFormState({ ...formState, errors });
      return false;
    } else {
      return true;
    }
  }

  async function signIn() {
    setLoading(true);

    try {
      const authData = await Auth.signIn(
        userEmail.current.value,
        userPassword.current.value
      );

      if (authData.challengeName == "NEW_PASSWORD_REQUIRED") {
        setFormState(() => ({
          ...formState,
          formType: "newPasswordRequired",
        }));
        setUser(authData);
        setLoading(false);
      } else {
        setUser(authData);
        props.setContext(authData);
        Router.push("/authenticate");
      }
    } catch (error) {
      setFormState(() => ({
        ...formState,
        errors: { alert: { message: error.message } },
      }));
    } finally {
      setLoading(false);
    }
  }

  async function newPasswordRequired() {
    setLoading(true);

    try {
      const userData = await Auth.completeNewPassword(
        user,
        userNewPassword.current.value,
        { email: userEmail.current.value }
      );

      setUser(userData);
    } catch (error) {
      setFormState(() => ({
        ...formState,
        errors: { alert: { message: error.message } },
      }));
    } finally {
      setLoading(false);
    }
  }

  const SignInForm = () => (
    <>
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        ref={userPassword}
        errors={formState.errors}
      />

      <Link href="/reset-password">
        <a className="text-green-700 text-sm mb-16 cursor-pointer">
          Forgot your password?
        </a>
      </Link>

      <Button size={Button.Size.LARGE} loading={loading}>
        Sign in
      </Button>
    </>
  );

  const SetPasswordForm = () => (
    <>
      <Input
        type="password"
        name="newPassword"
        label="Change your password"
        placeholder="Enter your new password"
        ref={userNewPassword}
        errors={formState.errors}
      />

      <Button size={Button.Size.LARGE} loading={loading}>
        Set new password
      </Button>
    </>
  );

  return (
    <Page backgroundColor={Page.Color.TEAL}>
      <div className="max-w-md w-full m-auto p-0">
        <img
          className="h-12 w-full mb-8"
          src="/clear_full_logo_light.svg"
          alt="Clear Currency"
        />

        <div className="p-6 space-y-6 bg-white rounded-md flex justify-center flex-col shadow-md">
          <h1 className="block w-full text-center text-gray-800 text-2xl">
            {formState.formType === "newPasswordRequired"
              ? "Set your password"
              : "Sign in to your account"}
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex justify-center flex-col space-y-6"
          >
            {formState.errors.alert && (
              <Alert
                text={formState.errors.alert.message}
                status={Alert.Status.CRITICAL}
              />
            )}

            <Input
              type="email"
              name="email"
              label="Email address"
              placeholder="Enter your email"
              ref={userEmail}
              disabled={formState.formType === "newPasswordRequired"}
              errors={formState.errors}
            />

            {formState.formType === "signIn" && <SignInForm />}
            {formState.formType === "newPasswordRequired" && (
              <SetPasswordForm />
            )}
          </form>
        </div>
      </div>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
};

export default Login;
