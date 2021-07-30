import React from "react";
import Page from "../../components/page/Page";
import { withSSRContext } from "aws-amplify";
import Steps, { StepItem } from "../../components/steps";
import Step from "../../components/steps/step";
import { Form1, Form2A, Form2B, Form3 } from "../../components/steps/forms";

const Transfer: React.FC<{ client: any }> = () => {
  return (
    <Page>
      <Steps nav={<Step />}>
        <StepItem title="Amount" form={<Form1 />} />
        <StepItem title="Beneficiary">
          <Steps>
            <StepItem form={<Form2A />} />
            <StepItem form={<Form2B />} />
          </Steps>
        </StepItem>
        <StepItem title="Confirm & Pay" form={<Form3 />} />
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
