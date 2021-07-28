import React from "react";
import Page from "../components/page/Page";
import { withSSRContext } from "aws-amplify";

const Dashboard: React.FC<{ client: any }> = ({ client }) => {
  return (
    <Page>
      <div className="flex-col">
        <div className="m-12">
          <h1 className="text-4xl">Welcome {client?.ctc_first_name}</h1>
          <p className="text-lg text-gray-500">
            Where would you like to start?
          </p>
        </div>
      </div>
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

export default Dashboard;
