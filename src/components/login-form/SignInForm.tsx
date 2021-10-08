import React, { Ref } from "react";
import Link from "next/link";
import { Input, Button } from "@clear-treasury/design-system";

export interface SignInFormProps {
  passwordRef: Ref<HTMLInputElement | null>;
  errors: any;
  loading: boolean;
}

export const SignInForm: React.FunctionComponent<SignInFormProps> = ({
  passwordRef,
  errors,
  loading,
}) => (
  <>
    <Input
      type="password"
      name="password"
      label="Password"
      placeholder="Enter your password"
      ref={passwordRef}
      errors={errors}
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
