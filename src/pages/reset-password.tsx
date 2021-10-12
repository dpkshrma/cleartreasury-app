import * as React from "react";
import { Auth } from "aws-amplify";
import { ThumbUpIcon } from "@heroicons/react/solid";
import { Alert, Button } from "@clear-treasury/design-system";
import styles from "./reset-password.module.scss";
import { useRouter } from "next/router";
import InitiatePasswordResetForm from "../components/reset-password-form/InitiatePasswordResetForm";
import SubmitNewPasswordForm from "../components/reset-password-form/SubmitNewPasswordForm";

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

const ResetPasswordPage = (): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [invalidCode, setInvalidCode] = React.useState(false);
  const [formState, setFormState] = React.useState<FormState>(initialFormState);
  const [queryData, setQueryData] = React.useState(null);
  const { formType, alert, alertStatus, alertMessage, alertIcon } = formState;
  const userEmail = React.useRef<HTMLInputElement | null>(null);
  const userNewPassword = React.useRef<HTMLInputElement | null>(null);
  const invalidResetLinkErrMsg = "Invalid reset password link";

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
        if (!data.passcode || !data.email) {
          throw new Error(invalidResetLinkErrMsg);
        }
        setQueryData(data);
      } catch (error) {
        setInvalidCode(true);
        setFormState(() => ({
          ...formState,
          formType: FormType.submitNewPassword,
          alert: true,
          alertMessage: invalidResetLinkErrMsg,
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

  const renderForm = (formType) => {
    switch (formType) {
      case FormType.codeSend:
        return (
          <div
            className={`${styles.alertContainer}`}
            data-testid="code-sent-alert"
          >
            <Alert
              status={Alert.Status.PRIMARY}
              text="Please check your email and follow the instructions in the message we have just sent to you."
            />
          </div>
        );
      case FormType.resetPassword:
        return (
          <InitiatePasswordResetForm
            onSubmit={sendResetCode}
            loading={loading}
            emailRef={userEmail}
          />
        );
      case FormType.submitNewPassword:
        return (
          <SubmitNewPasswordForm
            loading={loading}
            invalidCode={invalidCode}
            onSubmit={submitNewPassword}
            passwordRef={userNewPassword}
          />
        );
      case FormType.signIn:
        return (
          <Button
            size={Button.Size.LARGE}
            onClick={() => router.push("/login")}
          >
            Sign in
          </Button>
        );
      default:
        return null;
    }
  };

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
              <div className="mb-6" data-testid="page-alert">
                <Alert
                  status={alertStatus}
                  text={alertMessage}
                  icon={alertIcon}
                />
              </div>
            )}
            {renderForm(formType)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
