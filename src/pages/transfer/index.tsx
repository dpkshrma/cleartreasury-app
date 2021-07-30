import React from "react";
import Page from "../../components/page/Page";
import { withSSRContext } from "aws-amplify";
import Router from "next/router";
import Steps from "../../components/steps";
import TransferSteps from "../../components/transfer-steps";
import { Step1 } from "../../components/transfer-steps/temp/step1";
import { Step2 } from "../../components/transfer-steps/temp/step2";
import { Step3 } from "../../components/transfer-steps/temp/step3";

const Transfer: React.FC<{ client: any }> = () => {
  return (
    <Page>
      <Steps nav={<TransferSteps />} onComplete={() => Router.push("/")}>
        <Step1 />
        <Step2 />
        <Step3 />
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
