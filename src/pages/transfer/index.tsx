import React from "react";
import Page from "../../components/page/Page";
import { withSSRContext } from "aws-amplify";
import Steps from "../../components/steps";
import Step from "../../components/steps/step";
import { Form1, Form2A, Form2B, Form3 } from "../../components/steps/forms";

const Transfer = (): JSX.Element => {
  return (
    <Page>
      <Steps nav={<Step />}>
        <Steps.Step key={0} title="Amount" form={<Form1 />} />
        <Steps.Step key={1} title="Beneficiary">
          <Steps>
            <Steps.Step key={0} form={<Form2A />} />
            <Steps.Step key={1} form={<Form2B />} />
          </Steps>
        </Steps.Step>
        <Steps.Step key={2} title="Confirm & Pay" form={<Form3 />} />
      </Steps>
    </Page>
  );
};

export const getServerSideProps = async ({ req, res }) => {
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
