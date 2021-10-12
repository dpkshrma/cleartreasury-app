import { Alert, Button, Input } from "@clear-treasury/design-system";
import React, { FunctionComponent, Ref } from "react";
import styles from "./reset-password-form.module.scss";

export interface InitiatePasswordResetFormProps {
  onSubmit: () => void;
  loading: boolean;
  emailRef: Ref<HTMLInputElement | null>;
}

const InitiatePasswordResetForm: FunctionComponent<InitiatePasswordResetFormProps> =
  ({ onSubmit, emailRef, loading }) => {
    return (
      <React.Fragment>
        <div className={`mb-6 ${styles.alertContainer}`}>
          <Alert
            status={Alert.Status.PRIMARY}
            text="Please enter the email address you used to sign up and we will send you a link to reset your password"
          />
        </div>
        <div className="mb-6">
          <Input
            name="email"
            type="email"
            label="Email address"
            placeholder="Enter your email"
            ref={emailRef}
          />
        </div>
        <Button
          loading={loading}
          size={Button.Size.LARGE}
          onClick={onSubmit}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          disabled={loading}
        >
          Send Code
        </Button>
      </React.Fragment>
    );
  };

export default InitiatePasswordResetForm;
