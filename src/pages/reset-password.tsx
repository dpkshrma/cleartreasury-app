import * as React from "react";
import { useRouter } from "next/router";
import { ThumbUpIcon } from "@heroicons/react/solid";
import { Alert, Button } from "@clear-treasury/design-system";
import { AlertProps } from "@clear-treasury/design-system/dist/components/alert/Alert";
import InitiatePasswordResetForm from "../components/reset-password-form/InitiatePasswordResetForm";
import SubmitNewPasswordForm from "../components/reset-password-form/SubmitNewPasswordForm";
import ResetPasswordForm from "../components/reset-password-form/ResetPasswordForm";

enum FormType {
  resetPassword = "resetPassword",
  codeSend = "codeSend",
  submitNewPassword = "submitNewPassword",
  signIn = "signIn",
}

const ResetPasswordPage = (): JSX.Element => {
  const router = useRouter();
  const [alert, setAlert] = React.useState<AlertProps>();
  const [formType, setFormType] = React.useState<FormType>(
    FormType.resetPassword
  );
  const [isPageReady, setIsPageReady] = React.useState(false);

  React.useEffect(() => {
    if (!router.isReady) return;
    setIsPageReady(true);
    if (router.query.code) {
      setFormType(FormType.submitNewPassword);
    }
  }, [router.isReady]);

  const onSendResetCodeSuccess = () => {
    setFormType(FormType.codeSend);
    setAlert(null);
  };

  const onSendResetCodeFailure = (error) => {
    setFormType(FormType.resetPassword);
    setAlert({
      text: error.message,
      status: Alert.Status.CRITICAL,
    });
  };

  const onNewPasswordSuccess = () => {
    setFormType(FormType.signIn);
    setAlert({
      text: "Password succesfully updated",
      status: Alert.Status.POSITIVE,
      icon: ThumbUpIcon,
    });
  };

  const onNewPasswordFailure = (error: Error) => {
    setFormType(FormType.submitNewPassword);
    setAlert({
      text: error.message,
      status: Alert.Status.CRITICAL,
    });
  };

  const renderForm = () => {
    switch (formType) {
      case FormType.codeSend:
        return (
          <div data-testid="code-sent-alert">
            <Alert
              status={Alert.Status.PRIMARY}
              text="Please check your email and follow the instructions in the message we have just sent to you."
            />
          </div>
        );
      case FormType.resetPassword:
        return (
          <InitiatePasswordResetForm
            onSuccess={onSendResetCodeSuccess}
            onFailure={onSendResetCodeFailure}
          />
        );
      case FormType.submitNewPassword:
        return (
          <SubmitNewPasswordForm
            onSuccess={onNewPasswordSuccess}
            onFailure={onNewPasswordFailure}
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

  if (!isPageReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-teal-600">
      <ResetPasswordForm alert={alert}>{renderForm()}</ResetPasswordForm>
    </div>
  );
};

export default ResetPasswordPage;
