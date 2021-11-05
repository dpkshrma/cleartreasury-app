import * as React from "react";
import { Alert } from "@clear-treasury/design-system";
import { AlertProps } from "@clear-treasury/design-system/dist/components/alert/Alert";

interface ResetPasswordFormProps {
  alert: AlertProps;
}

const ResetPasswordForm: React.FunctionComponent<ResetPasswordFormProps> = ({
  children,
  alert,
}) => {
  return (
    <div className="max-w-sm w-full mx-auto mt-28 p-0">
      <img
        className="h-12 w-full mb-8"
        src="/clear_full_logo_light.svg"
        alt="Clear Currency"
      />
      <div className="p-6 bg-white rounded-md flex justify-center flex-col shadow-md">
        <h1 className="block w-full text-center mb-6 text-gray-800 text-2xl">
          Reset your password
        </h1>
        {!!alert && (
          <div className="mb-6" data-testid="page-alert">
            <Alert status={alert.status} text={alert.text} icon={alert.icon} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
