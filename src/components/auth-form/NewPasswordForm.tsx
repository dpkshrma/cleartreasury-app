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

  const { register } = useFormContext();
  return (
    <>
      <Input
        type="email"
        label="Email address"
        placeholder="Enter your email"
        errors={errors}
        {...register("email")}
      />
      <Input
        type="password"
        label="Change your password"
        placeholder="Enter your new password"
        errors={errors}
        {...register("newPassword")}
      />

      <Button size={Button.Size.LARGE} loading={loading}>
        Set new password
      </Button>
    </>
  );
};
