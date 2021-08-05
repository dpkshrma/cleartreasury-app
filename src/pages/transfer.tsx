import * as React from "react";
import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import Page from "../components/page/Page";
import Steps from "../components/steps/Steps";
import Step from "../components/steps/Step";
import QuoteForm from "../components/quote-form/QuoteForm";

const Transfer = (): JSX.Element => (
  <Page title="Make a transfer">
    <Steps nav={<Step />}>
      <Steps.Step
        stepTitle="Amount"
        form={<QuoteForm title="How much would you like to transfer?" />}
      />
      <Steps.Step stepTitle="Beneficiary" form={<div />} />
      <Steps.Step stepTitle="Confirm and pay" form={<div />} />
    </Steps>
  </Page>
);

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
