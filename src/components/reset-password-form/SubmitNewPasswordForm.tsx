import { Button, Input } from "@clear-treasury/design-system";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FunctionComponent } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";

export interface SubmitNewPasswordFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
  invalidCode: boolean;
}

const schema = yup
  .object({
    newPassword: yup.string().min(8).required(),
  })
  .required();

const SubmitNewPasswordForm: FunctionComponent<SubmitNewPasswordFormProps> = ({
  loading,
  invalidCode,
  onSubmit,
}) => {
  const form = useForm({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mb-6">
        <Input
          name="newPassword"
          type="password"
          label="Password"
          placeholder="Password 8+ characters"
          {...form.register("newPassword")}
        />
      </div>
      <Button
        loading={loading}
        size={Button.Size.LARGE}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        disabled={invalidCode || loading}
      >
        Submit
      </Button>
    </form>
  );
};

export default SubmitNewPasswordForm;
