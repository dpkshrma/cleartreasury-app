import React, { useState } from "react";
import { TransferStepsEnum } from "./enums/transfer-steps.enum";
import { StepType } from "./types/step.type";
import Step from "./step";

const initialSteps: { [key in TransferStepsEnum as string]: StepType } = {
  [TransferStepsEnum.AMOUNT]: {
    name: "Amount",
    enabled: true,
  },
  [TransferStepsEnum.BENEFICIARY]: {
    name: "Beneficiary",
    enabled: false,
    completed: false,
  },
  [TransferStepsEnum.CONFIRMATION]: {
    name: "Confirmation",
    enabled: false,
    completed: false,
  },
};

const Steps = () => {
  const [activeStep, setActiveStep] = useState(TransferStepsEnum.AMOUNT);
  const [steps, setSteps] = useState(initialSteps);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const enableStep = (stepToEnable: TransferStepsEnum) => {
    setSteps((prevState) => ({
      ...prevState,
      [activeStep]: {
        ...prevState[activeStep],
        enabled: false,
      },
      [stepToEnable]: {
        ...prevState[stepToEnable],
        enabled: true,
      },
    }));
    setActiveStep(stepToEnable);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateCompleteState = (
    step: TransferStepsEnum,
    completed?: boolean
  ) => {
    setSteps((prevState) => ({
      ...prevState,
      [step]: {
        ...prevState[step],
        completed,
      },
    }));
  };

  const stepClicked = (stepKey: TransferStepsEnum) => {
    if (!steps[stepKey].enabled) return;

    setActiveStep(stepKey);
  };

  const getActiveComponent = () => {
    switch (activeStep) {
      case TransferStepsEnum.AMOUNT:
        return <div>step 1</div>;
      case TransferStepsEnum.BENEFICIARY:
        return <div>step 2</div>;
      case TransferStepsEnum.CONFIRMATION:
        return <div>step 3</div>;
    }
  };

  return (
    <div className="tabs w-full px-48 pt-20">
      <div className="flex justify-between">
        {Object.keys(steps).map((key: any, index: number) => (
          <Step
            key={key}
            step={steps[key]}
            index={index + 1}
            isActive={activeStep === key}
            onClick={() => stepClicked(key as TransferStepsEnum)}
          />
        ))}
      </div>
      <div className="pt-10">{getActiveComponent()}</div>
    </div>
  );
};

export default Steps;
