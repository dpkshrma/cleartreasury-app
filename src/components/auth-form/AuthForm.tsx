import React, { FunctionComponent } from "react";

const AuthForm: FunctionComponent = ({ children }) => {
  return (
    <div className="p-6 space-y-6 bg-white rounded-md flex justify-center flex-col shadow-md">
      {children}
    </div>
  );
};

export default AuthForm;
