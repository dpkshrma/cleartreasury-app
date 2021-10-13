import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Input, Button } from "@clear-treasury/design-system";
import { FieldErrors, useFormContext } from "react-hook-form";
import { FormType } from "./types";

export interface SignInFormProps {
  errors?: FieldErrors;
  loading?: boolean;
  formType?: FormType;
}

export const SignInForm: FunctionComponent<SignInFormProps> = ({
  errors,
  loading,
  formType,
}) => {
  if (formType !== FormType.signInForm) return null;

  const { register } = useFormContext();
  return (
    <>
      <Input
        type="text"
        label="Email address"
        placeholder="Enter your email"
        errors={errors}
        {...register("email")}
      />

      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        errors={errors}
        {...register("password")}
      />

      <Link href="/reset-password">
        <a className="text-green-700 text-sm mb-16 cursor-pointer">
          Forgot your password?
        </a>
      </Link>

      <Button size={Button.Size.LARGE} loading={loading}>
        Sign in
      </Button>
    </>
  );
};
