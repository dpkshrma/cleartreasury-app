import * as React from "react";
import { render } from "../../../test/testUtils";
import Steps from "./steps";
import Page from "../page/Page";
import Step from "./step";

export const Form1: React.FC<{
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

export const Form2A: React.FC<{
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

export const Form2B: React.FC<{
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

export const Form3: React.FC<{
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

describe("Steps", () => {
  it("matches snapshot for nested children", () => {
    const { asFragment } = render(
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
      </Page>,
      {}
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
