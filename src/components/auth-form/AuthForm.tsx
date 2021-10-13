import Auth, { CognitoUser } from "@aws-amplify/auth";
import { Alert } from "@clear-treasury/design-system";
import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  Children,
  cloneElement,
  FunctionComponent,
  isValidElement,
  useState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { FormData, FormType } from "./types";

interface AuthFormProps {
  onSignIn: (authData: CognitoUser) => void;
  onNewPasswordSet: (authData: CognitoUser) => void;
}

const formFields = {
  email: "email",
  password: "password",
  newPassword: "newPassword",
};

const schema = yup
  .object({
    [formFields.email]: yup.string().email().required(),
    [formFields.password]: yup.string(),
    [formFields.newPassword]: yup.string(),
  })
  .required();

const AuthForm: FunctionComponent<AuthFormProps> = ({
  children,
  onSignIn,
  onNewPasswordSet,
}) => {
  const [user, setUser] = useState<CognitoUser>();
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState();
  const [formType, setFormType] = useState<FormType>(FormType.signInForm);
  const formMethods = useForm({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState } = formMethods;
  const { errors } = formState;

  async function onSignInSubmit(formData: FormData) {
    try {
      const authData = await Auth.signIn(formData.email, formData.password);
      if (authData.challengeName == "NEW_PASSWORD_REQUIRED") {
        setFormType(FormType.newPasswordForm);
        setUser(authData);
      } else {
        await onSignIn(authData);
      }
    } catch (error) {
      setLoading(false);
      setApiError(error.message);
    }
  }

  async function onNewPasswordSubmit(formData: FormData) {
    try {
      const userData = await Auth.completeNewPassword(
        user,
        formData.newPassword,
        { email: formData.email }
      );
      setUser(userData);
      await onNewPasswordSet(userData);
    } catch (error) {
      setLoading(false);
      setApiError(error.message);
    }
  }

  function onSubmit(formData: FormData) {
    setLoading(true);
    setApiError(null);
    if (formType == FormType.signInForm) {
      onSignInSubmit(formData);
    } else if (formType == FormType.newPasswordForm) {
      onNewPasswordSubmit(formData);
    }
  }

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const childProps: any = { loading, errors, formType };
      return cloneElement(child, childProps);
    }
    return child;
  });

  return (
    <div className="p-6 space-y-6 bg-white rounded-md flex justify-center flex-col shadow-md">
      <h1 className="block w-full text-center text-gray-800 text-2xl">
        {formType === FormType.newPasswordForm
          ? "Set your password"
          : "Sign in to your account"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center flex-col space-y-6"
      >
        <FormProvider {...formMethods}>
          {!!apiError && (
            <Alert text={apiError} status={Alert.Status.CRITICAL} />
          )}
          {childrenWithProps}
        </FormProvider>
      </form>
    </div>
  );
};

export default AuthForm;
