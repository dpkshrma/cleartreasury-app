import React from "react";
import Page from "../components/page/Page";
import { Button } from "@clear-treasury/design-system";
import { withSSRContext } from "aws-amplify";

function Dashboard({ user }) {
  return (
    <Page>
      <div className="m-12">
        <h1 className="text-4xl">Welcome {user.username}</h1>
        <p className="text-lg text-gray-500">Where would you like to start?</p>
        <Button>Button</Button>
        <Button inverted>Button</Button>
      </div>
    </Page>
  );
}

export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      props: {
        authenticated: true,
        user: user,
      },
    };
  } catch (err) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return { props: {} };
}

export default Dashboard;
