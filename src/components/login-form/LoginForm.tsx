import { Alert } from "@clear-treasury/design-system";
import { FunctionComponent } from "react";
import { NewPasswordForm, NewPasswordFormProps } from "./NewPasswordForm";
import { SignInForm, SignInFormProps } from "./SignInForm";

export interface LoginFormProps extends SignInFormProps, NewPasswordFormProps {
  formType: "signIn" | "newPasswordRequired";
  onSubmit: (event: React.SyntheticEvent) => void;
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({
  errors,
  formType,
  loading,
  emailRef,
  passwordRef,
  newPasswordRef,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center flex-col space-y-6"
    >
      {errors.alert && (
        <Alert text={errors.alert.message} status={Alert.Status.CRITICAL} />
      )}

      {formType === "signIn" && (
        <SignInForm
          loading={loading}
          errors={errors}
          emailRef={emailRef}
          passwordRef={passwordRef}
        />
      )}
      {formType === "newPasswordRequired" && (
        <NewPasswordForm
          loading={loading}
          errors={errors}
          emailRef={emailRef}
          newPasswordRef={newPasswordRef}
        />
      )}
    </form>
  );
};
