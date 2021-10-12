import * as React from "react";
import { Button, Input } from "@clear-treasury/design-system";
import { useApp } from "../../pages/_app";
import { useQuery } from "../../hooks/useQuery";
import { REQUEST_CODE, VERIFY_CODE } from "../../graphql/verify/queries";

type Error = {
  message: string;
};

type Errors = {
  verificationCode?: Error;
};

interface QueryVariables {
  To: string;
  Code?: string;
}

interface VerificationFormProps {
  onComplete?: (verified: boolean) => void;
  stepBack?: (stepNumber: number) => void;
}

const VerificationForm = ({
  onComplete,
}: VerificationFormProps): JSX.Element => {
  const authContext: any = useApp();
  const verificationCode = React.useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = React.useState<Errors>({});

  const [queryVariables, setQueryVariables] = React.useState<QueryVariables>({
    To: authContext.phone_number,
  });

  const { data } = useQuery(
    queryVariables.Code ? VERIFY_CODE : REQUEST_CODE,
    queryVariables
  );

  React.useEffect(() => {
    if (data?.status === "approved") {
      onComplete(true);
    }
  }, [data?.status]);

  const verifyCode = (event: React.FormEvent) => {
    event.preventDefault();

    if (!verificationCode.current.value) {
      setErrors({
        verificationCode: {
          message: "You must enter a verification code",
        },
      });

      return false;
    }

    setQueryVariables({
      ...queryVariables,
      Code: verificationCode.current.value,
    });
  };

  return (
    <form onSubmit={verifyCode} className="space-y-6">
      <div className="block w-full">
        <h2 className="text-theme-color-on-surface text-2xl">
          Enter the verification code
        </h2>

        <p className="text-l text-gray-500">
          We have sent a 6 digit verification code to *******1969 It may take a
          few moments to arrive
        </p>
      </div>

      <Input
        ref={verificationCode}
        name="verificationCode"
        label="Verification code"
        placeholder="Enter code"
        errors={errors}
      />

      <hr className="pb-2" />

      <div className="flex justify-center">
        <Button size={Button.Size.LARGE}>Continue</Button>
      </div>
    </form>
  );
};

export default VerificationForm;
