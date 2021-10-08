import * as React from "react";
import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import Page from "../components/page/Page";
import Steps from "../components/steps/Steps";
import Step from "../components/steps/Step";
import QuoteForm, { Quote } from "../components/quote-form/QuoteForm";
import { Client } from "./_app";
import BeneficiaryForm, {
  Beneficiary,
} from "../components/beneficiary-form/BeneficiaryForm";
import ConfirmPayForm, {
  Trade,
} from "../components/confirm-pay-form/ConfirmPayForm";
import PaymentDetails from "../components/confirm-pay-form/PaymentDetails";
import { useRouter } from "next/router";

export type FormData = {
  quote?: Quote;
  beneficiary?: Beneficiary;
  trade?: Trade;
};

interface Props {
  client: Client;
  authenticated: boolean;
}

const Transfer = ({ client, authenticated }: Props): JSX.Element => {
  const router = useRouter();
  const [formData, setFormData] = React.useState<FormData>({});
  const [stepNumber, setStepNumber] = React.useState<number>();
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
      <Steps nav={<Step />} goBack={stepNumber}>
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
              stepBack={(step: number) => setStepNumber(step)}
              onComplete={(beneficiary) =>
                setFormData({ ...formData, beneficiary })
              }
            />
          }
        />
        <Steps.Step stepTitle="Confirm and pay">
          <Steps>
            <Steps.Step
              form={
                <ConfirmPayForm
                  client={client}
                  data={formData}
                  onComplete={(trade) => setFormData({ ...formData, trade })}
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
