export enum FormType {
  signInForm = "signInForm",
  newPasswordForm = "newPasswordForm",
}

export interface FormData {
  email: string;
  password: string;
  newPassword: string;
}
