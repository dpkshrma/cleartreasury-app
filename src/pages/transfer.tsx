import * as React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { withSSRContext } from "aws-amplify";
import { Client } from "./_app";
import Page from "../components/page/Page";
import Steps from "../components/steps/Steps";
import Step from "../components/steps/Step";
import QuoteForm, { Quote } from "../components/quote-form/QuoteForm";
import BeneficiaryForm, {
  Beneficiary,
} from "../components/beneficiary-form/BeneficiaryForm";
import ConfirmPayForm, {
  Payment,
  Trade,
} from "../components/confirm-pay-form/ConfirmPayForm";
import PaymentDetails from "../components/confirm-pay-form/PaymentDetails";

export type TransferData = {
  quote?: Quote;
  beneficiary?: Beneficiary;
  payment?: Payment;
  reason?: string;
  trade?: Trade;
};

interface Props {
  client: Client;
  authenticated: boolean;
}

const Transfer = ({ client, authenticated }: Props): JSX.Element => {
  const router = useRouter();

  const [formData, setFormData] = React.useState<TransferData>({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!authenticated) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [authenticated]);

  if (loading) {
    return <Page>Loading...</Page>;
  }

  return (
    <Page title="Make a transfer">
      <Steps nav={<Step />}>
        <Steps.Step
          stepTitle="Amount"
          form={
            <QuoteForm
              // TODO: Move this into a client context
              client={client}
              onComplete={(quote) => setFormData({ ...formData, quote })}
            />
          }
        />
        <Steps.Step
          stepTitle="Beneficiary"
          form={
            <BeneficiaryForm
              client={client}
              selected={{
                beneficiary: formData.beneficiary,
                reason: formData.reason,
              }}
              onComplete={(beneficiary) =>
                setFormData({ ...formData, ...beneficiary })
              }
            />
          }
        />
        <Steps.Step stepTitle="Confirm and pay">
          <Steps>
            <Steps.Step
              form={
                <ConfirmPayForm
                  quote={formData.quote}
                  reason={formData.reason}
                  beneficiary={formData.beneficiary}
                  onComplete={({ trade, payment }) =>
                    setFormData({ ...formData, trade, payment })
                  }
                />
              }
            />
            <Steps.Step form={<PaymentDetails details={formData} />} />
          </Steps>
        </Steps.Step>
      </Steps>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { Auth } = withSSRContext({ req });

  try {
    const user = await Auth.currentAuthenticatedUser();

    return {
      props: {
        authenticated: true,
        user: user.attributes,
      },
    };
  } catch (err) {
    return {
      props: {
        authenticated: false,
        user: null,
      },
    };
  }
};

export default Transfer;
