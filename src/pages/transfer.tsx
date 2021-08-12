import * as React from "react";
import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import Page from "../components/page/Page";
import Steps from "../components/steps/Steps";
import Step from "../components/steps/Step";
import QuoteForm, { QuoteFormData } from "../components/quote-form/QuoteForm";
import { Client } from "./_app";

type FormData = {
  quote?: QuoteFormData;
};

const Transfer = ({ client }: { client: Client }): JSX.Element => {
  const [formData, setFormData] = React.useState<FormData>({});

  return (
    <Page title="Make a transfer">
      <Steps nav={<Step />}>
        <Steps.Step
          stepTitle="Amount"
          form={
            <QuoteForm
              title="How much would you like to transfer?"
              // TODO: Move this into a client context
              client={client}
              onComplete={(quote) => setFormData({ quote })}
            />
          }
        />
        <Steps.Step
          stepTitle="Beneficiary"
          form={
            <>
              <pre>
                <code>{JSON.stringify(formData, null, 2)}</code>
              </pre>
            </>
          }
        />
        <Steps.Step stepTitle="Confirm and pay" form={<></>} />
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
