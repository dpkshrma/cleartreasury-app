import * as React from "react";
import { Meta } from "@storybook/react";
import Steps from "./steps";
import Page from "../page/Page";
import Step from "./step";
import { Form1, Form2A, Form2B, Form3 } from "./steps.test";

export default {
  title: "Components/Steps",
  component: Steps,
} as Meta;

export const Primary: React.VFC<Record<string, never>> = () => (
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
