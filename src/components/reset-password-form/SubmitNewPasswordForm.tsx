import { Button, Input } from "@clear-treasury/design-system";
import React, { FunctionComponent, Ref } from "react";

export interface SubmitNewPasswordFormProps {
  onSubmit: () => void;
  loading: boolean;
  invalidCode: boolean;
  passwordRef: Ref<HTMLInputElement | null>;
}

const SubmitNewPasswordForm: FunctionComponent<SubmitNewPasswordFormProps> = ({
  loading,
  passwordRef,
  invalidCode,
  onSubmit,
}) => {
  return (
    <React.Fragment>
      <div className="mb-6">
        <Input
          name="newPassword"
          type="password"
          label="Password"
          placeholder="Password 8+ characters"
          ref={passwordRef}
        />
      </div>
      <Button
        loading={loading}
        size={Button.Size.LARGE}
        onClick={onSubmit}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        disabled={invalidCode || loading}
      >
        Submit
      </Button>
    </React.Fragment>
  );
};

export default SubmitNewPasswordForm;
