import * as React from "react";
import Link from "next/link";
import Auth, { CognitoUser } from "@aws-amplify/auth";
import { Alert, Button, Input } from "@clear-treasury/design-system";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface SignInFormProps {
  onSubmit: (user: CognitoUser) => void;
}

enum FormFields {
  email = "email",
  password = "password",
}
const schema = yup
  .object({
    [FormFields.email]: yup.string().email().required(),
    [FormFields.password]: yup.string().required(),
  })
  .required();

export const SignInForm: React.FunctionComponent<SignInFormProps> = ({
  onSubmit,
}) => {
  const [apiError, setApiError] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const form = useForm({ resolver: yupResolver(schema) });

  async function onSignInSubmit(formData) {
    try {
      setLoading(true);
      const authData = await Auth.signIn(
        formData[FormFields.email],
        formData[FormFields.password]
      );
      onSubmit(authData);
    } catch (error) {
      setLoading(false);
      setApiError(error.message);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSignInSubmit)}
      className="flex justify-center flex-col space-y-6"
    >
      <h1 className="block w-full text-center text-gray-800 text-2xl">
        Sign in to your account
      </h1>
      {!!apiError && <Alert text={apiError} status={Alert.Status.CRITICAL} />}
      <Input
        type="email"
        label="Email address"
        placeholder="Enter your email"
        errors={form.formState.errors}
        {...form.register(FormFields.email)}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        errors={form.formState.errors}
        {...form.register(FormFields.password)}
      />
      <Link href="/reset-password">
        <a className="text-green-700 text-sm mb-16 cursor-pointer">
          Forgot your password?
        </a>
      </Link>
      <Button size={Button.Size.LARGE} loading={loading}>
        Sign in
      </Button>
    </form>
  );
};
