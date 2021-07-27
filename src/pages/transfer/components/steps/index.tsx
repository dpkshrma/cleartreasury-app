import React, { useState } from 'react';
import { TransferStepsEnum } from '../../enums/transfer-steps.enum';
import { StepType } from '../../types/step.type';
import Step from './step';
import { Step1 } from '../step1';
import { Step2 } from '../step2';
import { Step3 } from '../step3';

const initialSteps: { [key in TransferStepsEnum as string]: StepType } = {
  [TransferStepsEnum.AMOUNT]: {
    name: 'Amount',
    enabled: true
  },
  [TransferStepsEnum.BENEFICIARY]: {
    name: 'Beneficiary',
    enabled: false
  },
  [TransferStepsEnum.CONFIRMATION]: {
    name: 'Confirmation',
    enabled: false
  }
}

const Steps = () => {
  const [activeStep, setActiveStep] = useState(TransferStepsEnum.AMOUNT);
  const [steps, setSteps] = useState(initialSteps);

  const enableStep = (stepToEnable: TransferStepsEnum) => {
    setSteps(prevState => ({
        ...prevState,
        [activeStep]: {
          ...prevState[activeStep],
          enabled: false
        },
        [stepToEnable]: {
          ...prevState[stepToEnable],
          enabled: true
        }
      })
    );
    setActiveStep(stepToEnable);
  }

  const tabClicked = (stepKey: TransferStepsEnum) => {
    if (!steps[stepKey].enabled) return;

    setActiveStep(stepKey);
  }

  const getActiveComponent = () => {
    switch (activeStep) {
      case TransferStepsEnum.AMOUNT:
        return <Step1/>;
      case TransferStepsEnum.BENEFICIARY:
        return <Step2/>;
      case TransferStepsEnum.CONFIRMATION:
        return <Step3/>;
    }
  }

  return (
    <div className="tabs w-full px-48 pt-20">
      <div className="flex justify-between">
        {
          Object.keys(steps).map((key: any) =>
            (<Step key={key}
                   step={steps[key]}
                   onClick={() => tabClicked(key as TransferStepsEnum)}
            />)
          )
        }
      </div>
      <div className="pt-10">
        {getActiveComponent()}
      </div>
    </div>
  )
}

export default Steps;
