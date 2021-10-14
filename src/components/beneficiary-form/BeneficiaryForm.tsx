import * as React from "react";
import { Client } from "../../pages/_app";
import { useQuery } from "../../hooks/useQuery";
import { useMutation } from "../../hooks/useMutation";
import { GET_BENEFICIARIES } from "../../graphql/beneficiaries/queries";
import { CREATE_BENEFICIARY } from "../../graphql/beneficiaries/mutations";
import SelectBeneficiary from "./SelectBeneficiary";
import AddBeneficiaryForm from "./AddBeneficiaryForm";
import VerificationForm from "./VerificationForm";

export type Beneficiary = {
  id?: string;
  email: string;
  nickname: string;
  account_name: string;
  bankname: string;
  currency: string;
  country_code: string;
  address?: string;
  account_number?: string;
  sort_code?: string;
  iban?: string;
  swift?: string;
  routing_number?: string;
  cnaps?: string;
};

export interface BeneficiaryFormData {
  beneficiary: Beneficiary;
  reason: string;
}

export interface BeneficiaryFormProps {
  client: Client;
  stepBack?: (step: number) => void;
  onComplete?: (formData: BeneficiaryFormData) => void;
  selected?: BeneficiaryFormData;
}

const BeneficiaryForm = ({
  client,
  stepBack,
  onComplete,
  selected,
}: BeneficiaryFormProps): JSX.Element => {
  const [addBeneficiary, setAddBeneficiary] = React.useState<boolean>(false);
  const [verified, setVerified] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<BeneficiaryFormData>({
    beneficiary: null,
    reason: null,
  });

  const { data: beneficiariesList = [] } = useQuery(GET_BENEFICIARIES, {
    client_ref: client.cli_reference,
  });

  const { data: newBeneficiary } = useMutation(
    formData.beneficiary && verified ? CREATE_BENEFICIARY : null,
    {
      input: {
        ...formData.beneficiary,
        client_ref: client.cli_reference,
      },
    }
  );

  // Existing Beneficiary selected
  React.useEffect(() => {
    if (addBeneficiary && verified && newBeneficiary) {
      onComplete({ ...newBeneficiary, ...formData.beneficiary });
    }
  }, [addBeneficiary, verified, newBeneficiary]);

  // New beneficiary added
  React.useEffect(() => {
    if (!addBeneficiary && formData.beneficiary && formData.reason) {
      onComplete(formData);
    }
  }, [addBeneficiary, formData.beneficiary, formData.reason]);

  if (addBeneficiary) {
    if (formData.beneficiary) {
      return (
        <VerificationForm
          onComplete={(verified) => {
            setAddBeneficiary(false);
            setVerified(verified);
          }}
        />
      );
    }

    return (
      <AddBeneficiaryForm
        client={client}
        stepBack={() => setAddBeneficiary(false)}
        onComplete={setFormData}
      />
    );
  }

  return (
    <SelectBeneficiary
      client={client}
      selected={selected}
      beneficiaries={beneficiariesList}
      stepBack={stepBack}
      onComplete={setFormData}
      addBeneficiary={() => {
        setFormData({ beneficiary: null, reason: null });
        setAddBeneficiary(true);
      }}
    />
  );
};

export default BeneficiaryForm;
