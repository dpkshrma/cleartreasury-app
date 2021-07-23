import React, { useEffect } from "react";
import Router from "next/router";
import { Auth } from "aws-amplify";
import { Button, Input, Alert } from "@clear-treasury/design-system";
import Page from "../components/page/Page";
import { useApp } from "./_app";

type Values<T> = T[keyof T];

type FormState = {
  authCode: string;
  alert: boolean;
  alertMessage: string;
  alertStatus: Values<typeof Alert.Status>;
};

function Authenticate() {
  const authContext: any = useApp();

  const phoneNumber =
    authContext?.challengeParam?.CODE_DELIVERY_DESTINATION || "";

  const [user, setUser]: any = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [formState, setFormState] = React.useState<FormState>({
    authCode: "",
    alert: true,
    alertMessage:
      "A code has been sent to your phone number ending in " + phoneNumber,
    alertStatus: Alert.Status.POSITIVE,
  });

  const userAuthCode = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setUser(authContext);
  }, [user]);

  function handleSubmit(e: any) {
    e.preventDefault();
    confirmSignIn();
  }

  async function confirmSignIn() {
    setLoading(true);
    const userData = await Auth.confirmSignIn(
      user,
      userAuthCode.current.value,
      "SMS_MFA"
    )
      .then((res: any) => {
        setLoading(false);
        setUser(res);
        return res;
      })
      .catch((err: any) => {
        setFormState({
          ...formState,
          alert: true,
          alertMessage: err.message,
          alertStatus: Alert.Status.CRITICAL,
        });

        setLoading(false);
      });

    if (userData) {
      Router.push("/");
    }
  }

  async function resendConfirmationCode() {
    setLoading(true);
    try {
      await Auth.resendSignUp(user.username).then(() => {
        setFormState({
          ...formState,
          alert: true,
          alertMessage: "A code has been sent to your phone number again",
          alertStatus: Alert.Status.PRIMARY,
        });
        setLoading(false);
      });
    } catch (err) {
      setFormState({
        ...formState,
        alert: true,
        alertMessage: err.message,
        alertStatus: Alert.Status.CRITICAL,
      });
      setLoading(false);
    }
  }

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
            Enter authentication code
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center flex-col space-y-6"
          >
            {formState.alert && (
              <Alert
                status={formState.alertStatus}
                text={formState.alertMessage}
              />
            )}
            <div className="flex justify-center flex-col">
              <React.Fragment>
                <Input
                  name="authCode"
                  type="text"
                  label="Authentication code"
                  placeholder="Enter your code"
                  ref={userAuthCode}
                />
                <span
                  onClick={resendConfirmationCode}
                  className="cursor-pointer text-gray-600 text-sm mb-16"
                >
                  Resend verification code
                </span>
                <Button size={Button.Size.LARGE} loading={loading}>
                  Sign in
                </Button>
              </React.Fragment>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
}

// TODO: Get redireccts working according to comments below
// export async function getServerSideProps({ req }) {
//   const { Auth } = withSSRContext({ req });

//   try {
//     // If authenticated, redirect to dashboard
//     await Auth.currentAuthenticatedUser();

//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   } catch (err) {
//     try {
//       // If signIn complete but not confirmSignIn, show this MFA page
//     } catch (error) {
//       // If not authenticated, redirect to login
//       return {
//         redirect: {
//           destination: "/login",
//           permanent: false,
//         },
//       };
//     }
//   }
// }

export default Authenticate;
