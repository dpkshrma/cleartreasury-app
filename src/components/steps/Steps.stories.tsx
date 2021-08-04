import * as React from "react";
import { Meta, Story } from "@storybook/react";
import Steps from "./Steps";
import Step from "./Step";

export default {
  title: "Components/Steps",
  component: Steps,
} as Meta;

const Form: React.FC<{
  name: string;
  onComplete?(): void;
}> = ({ name, onComplete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <form data-testid="form" onSubmit={handleSubmit}>
      <h1>{name}</h1>
      <button>Continue</button>
    </form>
  );
};

const Form1 = (props) => <Form name="Form 1" {...props} />;
const Form2A = (props) => <Form name="Form 2A" {...props} />;
const Form2B = (props) => <Form name="Form 2B" {...props} />;
const Form3 = (props) => <Form name="Form 3" {...props} />;

export const Default: Story<Record<string, unknown>> = () => (
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
);
