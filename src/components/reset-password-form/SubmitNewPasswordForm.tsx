import { Button, Input } from "@clear-treasury/design-system";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FunctionComponent, useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Auth from "@aws-amplify/auth";

export interface SubmitNewPasswordFormProps {
  onSuccess: (data: any) => void;
  onFailure: (error: any) => void;
}

const schema = yup
  .object({
    newPassword: yup.string().min(8).required(),
  })
  .required();

const SubmitNewPasswordForm: FunctionComponent<SubmitNewPasswordFormProps> = ({
  onSuccess,
  onFailure,
}) => {
  const [invalidCode, setInvalidCode] = useState(false);
  const [queryData, setQueryData] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({ resolver: yupResolver(schema) });
  const router = useRouter();

  const invalidResetLinkErrMsg = "Invalid reset password link";

  useEffect(() => {
    if (!router || !router.isReady) return;
    if (router.query.code) {
      try {
        const data = JSON.parse(atob(router.query.code.toString()));
        if (!data.passcode || !data.email) {
          throw new Error(invalidResetLinkErrMsg);
        }
        setQueryData(data);
      } catch (error) {
        setInvalidCode(true);
        onFailure(new Error(invalidResetLinkErrMsg));
      } finally {
        setLoading(false);
      }
    }
  }, [router]);

  async function submitNewPassword(data) {
    try {
      setLoading(true);
      await Auth.forgotPasswordSubmit(
        queryData.email,
        queryData.passcode,
        data.newPassword
      );
      onSuccess(data);
    } catch (error) {
      onFailure(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(submitNewPassword)}>
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
