import Auth from "@aws-amplify/auth";
import { Alert, Button, Input } from "@clear-treasury/design-system";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface ResetPasswordFormData {
  email: string;
}

export interface InitiatePasswordResetFormProps {
  onSuccess: (data: any) => void;
  onFailure: (error: Error) => void;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const InitiatePasswordResetForm: FunctionComponent<InitiatePasswordResetFormProps> =
  ({ onSuccess, onFailure }) => {
    const [loading, setLoading] = useState(false);
    const form = useForm({ resolver: yupResolver(schema) });

    async function sendResetCode(data: ResetPasswordFormData) {
      try {
        setLoading(true);
        await Auth.forgotPassword(data.email);
        onSuccess(data);
      } catch (error) {
        onFailure(error);
      } finally {
        setLoading(false);
      }
    }

    return (
      <form onSubmit={form.handleSubmit(sendResetCode)}>
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
