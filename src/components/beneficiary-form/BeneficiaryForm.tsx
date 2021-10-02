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
  addBeneficiary: boolean;
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
    addBeneficiary: false,
    verified: false,
  });
  const [beneficiaryList, setBeneficiaryList] = React.useState<any[]>([]);

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
      setBeneficiaryList(beneficiariesList);
    }
  }, [beneficiariesList]);

  const stepBackControl = (stepNumber: number) => {
    if (beneficiaryList.length > 0) {
      setFormData({ ...formData, addBeneficiary: false });
    } else {
      stepBack(stepNumber);
    }
  };

  const RenderBeneficiary = () => {
    if (
      beneficiaryList.length > 0 &&
      !formData.addBeneficiary &&
      formData.beneficiary == null
    ) {
      return (
        <SelectBeneficiary
          beneficiariesList={beneficiariesList}
          client={client}
          stepBack={stepBack}
          onComplete={(beneficiary) =>
            setFormData({
              ...formData,
              beneficiary,
              addBeneficiary: false,
            })
          }
          beneficiaryForm={() => {
            setFormData({ ...formData, addBeneficiary: true });
          }}
        />
      );
    } else if (formData.addBeneficiary && formData.beneficiary == null) {
      return (
        <AddBeneficiaryForm
          client={client}
          stepBack={(stepNumber) => stepBackControl(stepNumber)}
          onComplete={(beneficiary) => {
            setFormData({ ...formData, beneficiary });
          }}
        />
      );
    } else if (formData.beneficiary && formData.beneficiary !== null) {
      return (
        <VerificationForm
          onComplete={(verified) => setFormData({ ...formData, verified })}
        />
      );
    } else {
      return (
        <AddBeneficiaryForm
          client={client}
          stepBack={(stepNumber) => stepBackControl(stepNumber)}
          onComplete={(beneficiary) =>
            setFormData({ ...formData, beneficiary })
          }
        />
      );
    }
  };

  return <RenderBeneficiary />;
};

export default BeneficiaryForm;
