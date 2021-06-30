import React from "react";
import Page from "../components/page/Page";
import { Button } from "design-system";

export const Dashboard = (): JSX.Element => (
  <Page>
    <div className="m-12">
      <h1 className="text-4xl">Welcome</h1>
      <p className="text-lg text-gray-500">Where would you like to start?</p>
      <Button>Button</Button>
      <Button inverted>Button</Button>
    </div>
  </Page>
);

export default Dashboard;
