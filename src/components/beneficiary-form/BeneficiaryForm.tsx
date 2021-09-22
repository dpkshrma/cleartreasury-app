import * as React from "react";
import { Client } from "../../pages/_app";
import { useMutation } from "../../hooks/useMutation";
import { CREATE_BENEFICIARY } from "../../graphql/beneficiaries/mutations";
// eslint-disable-next-line
import AddBeneficiaryForm, { AddBeneficiaryData } from "./AddBeneficiaryForm";
import VerificationForm from "./VerificationForm";
import SelectBeneficiary from "./SelectBeneficiary";
import { GET_BENEFICIARIES } from "../../graphql/beneficiaries/queries";
import { useQuery } from "../../hooks/useQuery";

export type { AddBeneficiaryData } from "./AddBeneficiaryForm";

export type Beneficiary = AddBeneficiaryData & {
  id: number;
};
interface BeneficiaryFormData {
  beneficiary: AddBeneficiaryData;
  selectedBeneficiary: boolean;
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
    selectedBeneficiary: false,
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

  const { data: beneficiariesList } = useQuery(GET_BENEFICIARIES, {
    client_ref: client.cli_reference,
  });

  React.useEffect(() => {
    if (formData.verified && beneficiary) {
      onComplete({ ...beneficiary, ...formData.beneficiary });
    }
  }, [formData.verified, beneficiary]);

  React.useEffect(() => {
    if (beneficiariesList) {
      setFormData({ ...formData, selectedBeneficiary: true });
    }
  }, [beneficiariesList]);

  const RenderBeneficiary = () => {
    if (formData.selectedBeneficiary && formData.beneficiary == null) {
      return (
        <SelectBeneficiary
          beneficiariesList={beneficiariesList}
          client={client}
          stepBack={stepBack}
          onComplete={(beneficiary) =>
            setFormData({
              ...formData,
              beneficiary,
              selectedBeneficiary: false,
            })
          }
          beneficiaryForm={() => {
            setFormData({ ...formData, selectedBeneficiary: false });
          }}
        />
      );
    } else if (!formData.beneficiary) {
      return (
        <AddBeneficiaryForm
          client={client}
          stepBack={stepBack}
          onComplete={(beneficiary) =>
            setFormData({ ...formData, beneficiary })
          }
        />
      );
    } else {
      return (
        <VerificationForm
          onComplete={(verified) => setFormData({ ...formData, verified })}
        />
      );
    }
  };

  return <RenderBeneficiary />;
};

export default BeneficiaryForm;
