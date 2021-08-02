import * as React from "react";
import { Meta } from "@storybook/react";
import Steps from "./steps";
import Page from "../page/Page";
import Step from "./step";

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

const Form1: React.FC<{
  onComplete?(): void;
}> = ({ onComplete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do stuff
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Step 1</p>
      <button>Continue</button>
    </form>
  );
};

const Form2A: React.FC<{
  onComplete?(): void;
}> = ({ onComplete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do stuff
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Step 2 A</p>
      <button>Continue</button>
    </form>
  );
};

const Form2B: React.FC<{
  onComplete?(): void;
}> = ({ onComplete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do stuff
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Step 2 B</p>
      <button>Continue</button>
    </form>
  );
};

const Form3: React.FC<{
  onComplete?(): void;
}> = ({ onComplete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do stuff
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Step 3</p>
      <button>Continue</button>
    </form>
  );
};
