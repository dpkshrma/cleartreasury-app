import React, { Ref } from "react";
import { Button, Input } from "@clear-treasury/design-system";
import { LoginFormErrors } from "./types";

export interface NewPasswordFormProps {
  newPasswordRef: Ref<HTMLInputElement | null>;
  emailRef: Ref<HTMLInputElement | null>;
  errors: LoginFormErrors;
  loading: boolean;
}

export const NewPasswordForm: React.FunctionComponent<NewPasswordFormProps> = ({
  newPasswordRef,
  emailRef,
  loading,
  errors,
}) => (
  <>
    <Input
      type="email"
      name="email"
      label="Email address"
      placeholder="Enter your email"
      ref={emailRef}
      errors={errors}
    />
    <Input
      type="password"
      name="newPassword"
      label="Change your password"
      placeholder="Enter your new password"
      ref={newPasswordRef}
      errors={errors}
    />

    <Button size={Button.Size.LARGE} loading={loading}>
      Set new password
    </Button>
  </>
);
