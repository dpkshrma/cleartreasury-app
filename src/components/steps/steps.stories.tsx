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

export const StepsStory: React.VFC<Record<string, never>> = () => (
  <Page>
    <Steps nav={<Step />}>
      <Steps.Step title="Amount" form={<Form1 />} />
      <Steps.Step title="Beneficiary">
        <Steps>
          <Steps.Step form={<Form2A />} />
          <Steps.Step form={<Form2B />} />
        </Steps>
      </Steps.Step>
      <Steps.Step title="Confirm & Pay" form={<Form3 />} />
    </Steps>
  </Page>
);
