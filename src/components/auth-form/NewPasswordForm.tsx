import Auth, { CognitoUser } from "@aws-amplify/auth";
import { Alert, Button, Input } from "@clear-treasury/design-system";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface NewPasswordFormProps {
  user: CognitoUser;
  onSubmit: (user: CognitoUser) => void;
}

enum FormFields {
  email = "email",
  newPassword = "newPassword",
}
const schema = yup
  .object({
    [FormFields.email]: yup.string().email().required(),
    [FormFields.newPassword]: yup.string().required(),
  })
  .required();

export const NewPasswordForm: FunctionComponent<NewPasswordFormProps> = ({
  user,
  onSubmit,
}) => {
  const [apiError, setApiError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: yupResolver(schema),
  });

  async function onNewPasswordSubmit(formData) {
    try {
      const userData = await Auth.completeNewPassword(
        user,
        formData[FormFields.newPassword],
        { email: formData[FormFields.email] }
      );
      onSubmit(userData);
    } catch (error) {
      setLoading(false);
      setApiError(error.message);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onNewPasswordSubmit)}
      className="flex justify-center flex-col space-y-6"
    >
      <h1 className="block w-full text-center text-gray-800 text-2xl">
        Set your password
      </h1>
      {!!apiError && <Alert text={apiError} status={Alert.Status.CRITICAL} />}
      <Input
        type="email"
        label="Email address"
        placeholder="Enter your email"
        errors={form.formState.errors}
        {...form.register(FormFields.email)}
      />
      <Input
        type="password"
        label="Change your password"
        placeholder="Enter your new password"
        errors={form.formState.errors}
        {...form.register(FormFields.newPassword)}
      />
      <Button size={Button.Size.LARGE} loading={loading}>
        Set new password
      </Button>
    </form>
  );
};
