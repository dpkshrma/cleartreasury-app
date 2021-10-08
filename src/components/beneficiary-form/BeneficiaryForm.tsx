import * as React from "react";
import { Client } from "../../pages/_app";
import { useMutation } from "../../hooks/useMutation";
import { CREATE_BENEFICIARY } from "../../graphql/beneficiaries/mutations";
import AddBeneficiaryForm from "./AddBeneficiaryForm";
import VerificationForm from "./VerificationForm";
import SelectBeneficiary from "./SelectBeneficiary";
import { GET_BENEFICIARIES } from "../../graphql/beneficiaries/queries";
import { useQuery } from "../../hooks/useQuery";

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

interface BeneficiaryFormData {
  beneficiary: Beneficiary;
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
  const [addBeneficiary, setAddBeneficiary] = React.useState<boolean>(false);
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

  const { data: beneficiariesList = [] } = useQuery(GET_BENEFICIARIES, {
    client_ref: client.cli_reference,
  });

  React.useEffect(() => {
    if (formData.verified && beneficiary) {
      onComplete({ ...beneficiary, ...formData.beneficiary });
    }
  }, [formData.verified, beneficiary]);

  const stepBackControl = (stepNumber: number) => {
    if (beneficiariesList.length > 0) {
      setAddBeneficiary(false);
    } else {
      stepBack(stepNumber);
    }
  };

  // const RenderBeneficiary = () => {
  //   if (
  //     beneficiaryList.length > 0 &&
  //     !formData.addBeneficiary &&
  //     formData.beneficiary == null
  //   ) {
  //     return (
  //       <SelectBeneficiary
  //         beneficiariesList={beneficiariesList}
  //         client={client}
  //         stepBack={stepBack}
  //         onComplete={(beneficiary) =>
  //           setFormData({
  //             ...formData,
  //             beneficiary,
  //             addBeneficiary: false,
  //           })
  //         }
  //         beneficiaryForm={() => {
  //           setFormData({ ...formData, addBeneficiary: true });
  //         }}
  //       />
  //     );
  //   } else if (formData.addBeneficiary && formData.beneficiary == null) {
  //     return (
  //       <AddBeneficiaryForm
  //         client={client}
  //         stepBack={(stepNumber) => stepBackControl(stepNumber)}
  //         onComplete={(beneficiary) => {
  //           setFormData({ ...formData, beneficiary });
  //         }}
  //       />
  //     );
  //   } else if (formData.beneficiary && formData.beneficiary !== null) {
  //     return (
  //       <VerificationForm
  //         onComplete={(verified) => setFormData({ ...formData, verified })}
  //       />
  //     );
  //   } else {
  //   }
  // };

  if (addBeneficiary) {
    if (!formData.beneficiary) {
      return (
        <AddBeneficiaryForm
          client={client}
          stepBack={stepBackControl}
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
  }

  return (
    <SelectBeneficiary
      client={client}
      beneficiaries={beneficiariesList}
      stepBack={stepBack}
      addBeneficiary={() => setAddBeneficiary(true)}
      onComplete={(beneficiary) => onComplete(beneficiary)}
    />
  );
};

export default BeneficiaryForm;
