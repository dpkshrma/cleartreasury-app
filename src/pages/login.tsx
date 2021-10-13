import * as React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { CognitoUser } from "@aws-amplify/auth";
import { withSSRContext } from "aws-amplify";
import { NewPasswordForm } from "../components/auth-form/NewPasswordForm";
import { SignInForm } from "../components/auth-form/SignInForm";
import AuthForm from "../components/auth-form/AuthForm";

type Props = {
  setContext: (user: CognitoUser) => void;
  authenticated: boolean;
};

const Login = (props: Props): JSX.Element => {
  const router = useRouter();

  React.useEffect(() => {
    if (props.authenticated) {
      router.push("/");
    }
  }, [props.authenticated]);

  const onSubmit = (authData: CognitoUser) => {
    props.setContext(authData);
    router.push("/authenticate");
  };

  return (
    <div className="flex h-screen bg-teal-600">
      <div className="max-w-md w-full m-auto p-0">
        <img
          className="h-12 w-full mb-8"
          src="/clear_full_logo_light.svg"
          alt="Clear Currency"
        />
        <AuthForm onSignIn={onSubmit} onNewPasswordSet={onSubmit}>
          <SignInForm />
          <NewPasswordForm />
        </AuthForm>
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
