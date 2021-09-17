import * as React from "react";
import { Client } from "../../pages/_app";
import { useMutation } from "../../hooks/useMutation";
import { CREATE_BENEFICIARY } from "../../graphql/beneficiaries/mutations";
// eslint-disable-next-line
import AddBeneficiaryForm, { AddBeneficiaryData } from "./AddBeneficiaryForm";
import VerificationForm from "./VerificationForm";
import SelectBeneficiary from "./SelectBeneficiary";

export type { AddBeneficiaryData } from "./AddBeneficiaryForm";

export type Beneficiary = AddBeneficiaryData & {
  id: number;
};

interface BeneficiaryFormData {
  beneficiary: AddBeneficiaryData;
  verified: boolean;
}
export interface BeneficiaryFormProps {
  client?: Client;
  onComplete?: (formData: Beneficiary) => void;
  stepBack?: (stepNumber: number) => void;
}

const BeneficiaryForm = ({
  client,
  onComplete,
  stepBack,
}: BeneficiaryFormProps): JSX.Element => {
  const [formData, setFormData] = React.useState<BeneficiaryFormData>({
    beneficiary: null,
    verified: false,
  });

  const { data: beneficiary } = useMutation(
    formData.beneficiary && formData.verified ? CREATE_BENEFICIARY : null,
    {
      input: {
        ...formData.beneficiary,
        client_ref: client.cli_reference,
      },
    }
  );

  React.useEffect(() => {
    if (formData.verified && beneficiary) {
      onComplete({ ...beneficiary, ...formData.beneficiary });
    }
  }, [formData.verified, beneficiary]);

  return !formData.beneficiary ? (
    <SelectBeneficiary client={client} stepBack={stepBack} />
  ) : (
    // <AddBeneficiaryForm
    //   client={client}
    //   stepBack={stepBack}
    //   onComplete={(beneficiary) => setFormData({ ...formData, beneficiary })}
    // />
    <VerificationForm
      onComplete={(verified) => setFormData({ ...formData, verified })}
    />
  );
};

export default BeneficiaryForm;
