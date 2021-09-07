import * as React from "react";
import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import Page from "../components/page/Page";
import Steps from "../components/steps/Steps";
import Step from "../components/steps/Step";
import QuoteForm, { QuoteFormData } from "../components/quote-form/QuoteForm";
import { Client } from "./_app";
import BeneficiaryForm, {
  BeneficiaryFormData,
} from "../components/beneficiary-form/BeneficiaryForm";
import ConfirmPayForm from "../components/confirm-pay-form/ConfirmPayForm";
import PaymentDetails from "../components/payment-details/PaymentDetails";

export type FormData = {
  quote?: QuoteFormData;
  beneficiary?: BeneficiaryFormData;
};

const Transfer = ({ client }: { client: Client }): JSX.Element => {
  // eslint-disable-next-line
  const [formData, setFormData] = React.useState<FormData>({});
  const [stepNumber, setStepNumber] = React.useState<number>();

  return (
    <Page title="Make a transfer">
      <Steps nav={<Step />} goBack={stepNumber}>
        <Steps.Step
          stepTitle="Amount"
          form={
            <QuoteForm
              title="How much would you like to transfer?"
              // TODO: Move this into a client context
              client={client}
              onComplete={(quote) => setFormData({ ...formData, quote: quote })}
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
                setFormData({ ...formData, beneficiary: beneficiary })
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
                  // eslint-disable-next-line
                  onComplete={(data) => console.log(data, "ConfirmPayForm")}
                />
              }
            />
            <Steps.Step
              form={
                <PaymentDetails
                  client={client}
                  data={formData}
                  // eslint-disable-next-line
                  onComplete={(data) => console.log(data, "PaymentDetails")}
                />
              }
            />
          </Steps>
        </Steps.Step>
      </Steps>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return { props: {} };
};

export default Transfer;
