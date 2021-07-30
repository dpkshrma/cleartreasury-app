import React from "react";
import Step from "./step";

const steps = ["Amount", "Beneficiary", "Confirmation"];

const TransferSteps: React.FC<{
  activeStep?: number;
  setActiveStep?(step: number): void;
}> = ({ activeStep, setActiveStep }) => {
  return (
    <div className="flex justify-between">
      {steps.map((step: any, index: number) => (
        <Step
          key={index}
          step={index}
          title={step}
          activeStep={activeStep}
          onClick={() => setActiveStep(index)}
        />
      ))}
    </div>
  );
};

export default TransferSteps;
