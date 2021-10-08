type Error = {
  message: string;
};

export type LoginFormErrors = {
  alert?: Error;
  email?: Error;
  password?: Error;
  newPassword?: Error;
};

export { SignInForm } from "./SignInForm";
export { NewPasswordForm } from "./NewPasswordForm";
