import React from "react";
import Page from "../../components/page/Page";
import { withSSRContext } from "aws-amplify";
import Steps from "../../components/steps";

const Transfer: React.FC<{ client: any }> = ({ client }) => {
  // eslint-disable-next-line no-console
  console.log(client, "client");
  return (
    <Page>
      <Steps />
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
