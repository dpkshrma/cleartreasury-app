type Error = {
  message: string;
};

export type LoginFormErrors = {
  alert?: Error;
  email?: Error;
  password?: Error;
  newPassword?: Error;
};
