import { Alert, Button, Input } from "@clear-treasury/design-system";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface InitiatePasswordResetFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const InitiatePasswordResetForm: FunctionComponent<InitiatePasswordResetFormProps> =
  ({ onSubmit, loading }) => {
    const form = useForm({ resolver: yupResolver(schema) });

    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6">
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
            {...form.register("email")}
          />
        </div>
        <Button
          loading={loading}
          size={Button.Size.LARGE}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          disabled={loading}
        >
          Send Code
        </Button>
      </form>
    );
  };

export default InitiatePasswordResetForm;
