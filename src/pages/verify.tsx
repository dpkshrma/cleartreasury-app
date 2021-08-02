import * as React from "react";
import Router from "next/router";
import { GetServerSideProps } from "next";
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
  verificationCode?: Error;
};

interface FormState {
  formType: "verify" | "newPasswordRequired";
  errors: Errors;
}

type Props = {
  useContext: () => void;
};

const Verify = (props: Props): JSX.Element => {
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [formState, setFormState] = React.useState<FormState>({
    formType: "verify",
    errors: {},
  });

  const userEmail = React.useRef<HTMLInputElement | null>(null);
  const verificationCode = React.useRef<HTMLInputElement | null>(null);
  const newPassword = React.useRef<HTMLInputElement | null>(null);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) return false;

    if (formState.formType === "verify") {
      signIn();
    } else if (formState.formType === "newPasswordRequired") {
      newPasswordRequired();
    }
  }

  function validateForm() {
    const errors: Errors = {};

    if (!userEmail?.current?.value) {
      errors.email = { message: "You must enter an email" };
    }

    if (formState.formType === "verify" && !verificationCode?.current?.value) {
      errors.verificationCode = {
        message: "You must enter a verification code",
      };
    }

    if (
      formState.formType === "newPasswordRequired" &&
      !newPassword?.current?.value
    ) {
      errors.password = { message: "You must enter a password" };
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
        verificationCode.current.value
      );

      setUser(authData);

      if (authData.challengeName == "NEW_PASSWORD_REQUIRED") {
        setFormState({
          ...formState,
          formType: "newPasswordRequired",
        });
      } else {
        props.setContext(authData);
        Router.push("/authenticate");
      }
    } catch (error) {
      if (error.message.includes("Incorrect username or password")) {
        error.message = "Invalid verification code";
      }

      setFormState({
        ...formState,
        errors: { alert: { message: error.message } },
      });
    } finally {
      setLoading(false);
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
      props.setContext(userData);
      Router.push("/authenticate");
    } catch (error) {
      setFormState({
        ...formState,
        errors: {
          alert: {
            message: error.message.replace(
              "Password does not conform to policy: ",
              ""
            ),
          },
        },
      });
    } finally {
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
        errors={formState.errors}
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
        errors={formState.errors}
      />

      <Button size={Button.Size.LARGE} loading={loading}>
        Set password
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

        <div className="p-6 bg-white rounded-md flex justify-center flex-col shadow-md">
          <h1 className="block w-full text-center mb-6 text-gray-800 text-2xl">
            {formState.formType === "verify"
              ? "Sign in to your account"
              : "Set your password"}
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
              name="email"
              type="email"
              label="Email address"
              placeholder="Enter your email"
              disabled={formState.formType === "newPasswordRequired"}
              ref={userEmail}
              errors={formState.errors}
            />

            {formState.formType === "verify" && <VerifyForm />}
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

export default Verify;
