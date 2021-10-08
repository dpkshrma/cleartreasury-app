import * as React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { CognitoUser } from "@aws-amplify/auth";
import { Auth, withSSRContext } from "aws-amplify";
import { Input, Alert } from "@clear-treasury/design-system";
import { LoginFormErrors, SignInForm } from "../components/login-form";
import { NewPasswordForm } from "../components/login-form/NewPasswordForm";

interface FormState {
  formType: "signIn" | "newPasswordRequired";
  errors: LoginFormErrors;
}

type Props = {
  setContext: (user: CognitoUser) => void;
  authenticated: boolean;
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

  const router = useRouter();

  React.useEffect(() => {
    if (props.authenticated) {
      router.push("/");
    }
  }, [props.authenticated]);

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
    const errors: LoginFormErrors = {};

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
      } else {
        setUser(authData);
        props.setContext(authData);
        router.push("/authenticate");
      }
    } catch (error) {
      setLoading(false);
      setFormState(() => ({
        ...formState,
        errors: { alert: { message: error.message } },
      }));
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

  return (
    <div className="flex h-screen bg-teal-600">
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

            {formState.formType === "signIn" && (
              <SignInForm
                loading={loading}
                errors={formState.errors}
                passwordRef={userPassword}
              />
            )}
            {formState.formType === "newPasswordRequired" && (
              <NewPasswordForm
                loading={loading}
                errors={formState.errors}
                passwordRef={userNewPassword}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { Auth } = withSSRContext({ req });

  try {
    await Auth.currentAuthenticatedUser();

    return {
      props: {
        authenticated: true,
      },
      // redirect: {
      //   destination: "/",
      //   permanent: false,
      // },
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
