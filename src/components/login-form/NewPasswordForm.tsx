import React, { Ref } from "react";
import { Button, Input } from "@clear-treasury/design-system";

export interface NewPasswordFormProps {
  passwordRef: Ref<HTMLInputElement | null>;
  errors: any;
  loading: boolean;
}

export const NewPasswordForm: React.FunctionComponent<NewPasswordFormProps> = ({
  passwordRef,
  loading,
  errors,
}) => (
  <>
    <Input
      type="password"
      name="newPassword"
      label="Change your password"
      placeholder="Enter your new password"
      ref={passwordRef}
      errors={errors}
    />

    <Button size={Button.Size.LARGE} loading={loading}>
      Set new password
    </Button>
  </>
);
