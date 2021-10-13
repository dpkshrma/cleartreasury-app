import React, { FunctionComponent } from "react";
import { Button, Input } from "@clear-treasury/design-system";
import { FieldErrors, useFormContext } from "react-hook-form";
import { FormType } from "./types";

export interface NewPasswordFormProps {
  errors?: FieldErrors;
  loading?: boolean;
  formType?: FormType;
}

export const NewPasswordForm: FunctionComponent<NewPasswordFormProps> = ({
  loading,
  errors,
  formType,
}) => {
  if (formType !== FormType.newPasswordForm) return null;

  const formContext = useFormContext();
  let emailInputProps = {};
  let passwordInputProps = {};
  if (formContext) {
    emailInputProps = formContext.register("email");
    passwordInputProps = formContext.register("password");
  }

  return (
    <>
      <Input
        type="email"
        name="email"
        label="Email address"
        placeholder="Enter your email"
        errors={errors}
        {...emailInputProps}
      />
      <Input
        type="password"
        name="newPassword"
        label="Change your password"
        placeholder="Enter your new password"
        errors={errors}
        {...passwordInputProps}
      />

      <Button size={Button.Size.LARGE} loading={loading}>
        Set new password
      </Button>
    </>
  );
};
