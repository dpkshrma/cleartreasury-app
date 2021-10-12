import * as React from "react";
import { Auth } from "aws-amplify";
import { ThumbUpIcon } from "@heroicons/react/solid";
import { Alert, Button, Input } from "@clear-treasury/design-system";
import styles from "./reset-password.module.scss";
import { useRouter } from "next/router";

enum FormType {
  resetPassword = "resetPassword",
  codeSend = "codeSend",
  submitNewPassword = "submitNewPassword",
  signIn = "signIn",
}

interface FormState {
  password: string;
  email: string;
  passwordCode: string;
  newPassword: string;
  formType: FormType;
  alert: boolean;
  alertMessage: string;
  alertStatus: any;
  alertIcon?: any;
}

const initialFormState = {
  password: "",
  email: "",
  passwordCode: "",
  newPassword: "",
  formType: FormType.resetPassword,
  alert: false,
  alertMessage: "",
  alertStatus: Alert.Status.CRITICAL,
};

const ResetPassword = (): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [formState, setFormState] = React.useState<FormState>(initialFormState);
  const [queryData, setQueryData] = React.useState(null);
  const { formType, alert, alertStatus, alertMessage, alertIcon } = formState;
  const userEmail = React.useRef<HTMLInputElement | null>(null);
  const userNewPassword = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!router.isReady) return;
    if (router.query.code) {
      try {
        setFormState(() => ({
          ...formState,
          formType: FormType.submitNewPassword,
        }));
        setLoading(true);
        const data = JSON.parse(atob(router.query.code.toString()));
        if (!data.passcode || !data.email)
          throw new Error("Invalid reset password link");
        setQueryData(data);
      } catch (error) {
        setFormState(() => ({
          ...formState,
          formType: FormType.submitNewPassword,
          alert: true,
          alertMessage: "Invalid Reset Password Link",
          alertStatus: Alert.Status.CRITICAL,
        }));
      } finally {
        setLoading(false);
      }
    }
  }, [router.isReady]);

  async function sendResetCode() {
    try {
      setLoading(true);
      await Auth.forgotPassword(userEmail.current.value);
      setFormState(() => ({
        ...formState,
        formType: FormType.codeSend,
        alert: false,
      }));
    } catch (error) {
      setFormState(() => ({
        ...formState,
        formType: FormType.resetPassword,
        alert: true,
        alertMessage: error.message,
        alertStatus: Alert.Status.CRITICAL,
      }));
    } finally {
      setLoading(false);
    }
  }

  async function submitNewPassword() {
    try {
      setLoading(true);
      await Auth.forgotPasswordSubmit(
        queryData.email,
        queryData.passcode,
        userNewPassword.current.value
      );
      setFormState(() => ({
        ...formState,
        formType: FormType.signIn,
        alert: true,
        alertMessage: "Password succesfully updated",
        alertStatus: Alert.Status.POSITIVE,
        alertIcon: ThumbUpIcon,
      }));
    } catch (error) {
      setFormState(() => ({
        ...formState,
        formType: FormType.submitNewPassword,
        alert: true,
        alertMessage: error.message,
        alertStatus: Alert.Status.CRITICAL,
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen bg-teal-600">
      {router.isReady && (
        <div className="max-w-sm w-full mx-auto mt-28 p-0">
          <img
            className="h-12 w-full mb-8"
            src="/clear_full_logo_light.svg"
            alt="Clear Currency"
          />
          <div className="p-6 bg-white rounded-md flex justify-center flex-col shadow-md">
            <h1 className="block w-full text-center mb-6 text-gray-800 text-2xl">
              Reset your password
            </h1>
            {!!alert && (
              <div className="mb-6">
                <Alert
                  status={alertStatus}
                  text={alertMessage}
                  icon={alertIcon}
                />
              </div>
            )}
            {formType === "signIn" && (
              <Button
                size={Button.Size.LARGE}
                onClick={() => router.push("/login")}
              >
                SignIn
              </Button>
            )}
            {formType === "resetPassword" && (
              <React.Fragment>
                <div className={`mb-6 ${styles.alertContainer}`}>
                  <Alert
                    status={Alert.Status.PRIMARY}
                    text="Please enter the email address you used to sign up and we will send you a link to reset your password"
                  />
                </div>
                <div className="mb-6">
                  <Input
                    name="email"
                    type="email"
                    label="Email address"
                    placeholder="Enter your email"
                    ref={userEmail}
                  />
                </div>
                <Button
                  loading={loading}
                  size={Button.Size.LARGE}
                  onClick={sendResetCode}
                >
                  Send Code
                </Button>
              </React.Fragment>
            )}
            {formType === "codeSend" && (
              <React.Fragment>
                <div className={styles.alertContainer}>
                  <Alert
                    status={Alert.Status.PRIMARY}
                    text="Please check your email and follow the instructions in the message we have just sent to you."
                  />
                </div>
              </React.Fragment>
            )}
            {formType === "submitNewPassword" && (
              <React.Fragment>
                <div className="mb-6">
                  <Input
                    name="newPassword"
                    type="password"
                    label="Password"
                    placeholder="Password 8+ characters"
                    ref={userNewPassword}
                  />
                </div>
                <Button
                  loading={loading}
                  size={Button.Size.LARGE}
                  onClick={submitNewPassword}
                >
                  Submit
                </Button>
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
