import React from "react";
import Page from "../components/page/Page";

export const Dashboard = (): JSX.Element => (
  <Page>
    <div className="m-12">
      <h1 className="text-4xl">Welcome</h1>
      <p className="text-lg text-gray-500">Where would you like to start?</p>
    </div>
  </Page>
);

export default Dashboard;
