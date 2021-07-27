import React from 'react';
import { StepType } from '../../types/step.type';

const Step: React.FC<{
  step: StepType,
  onClick(): void,
}> = ({step, onClick}) => (
  <div className={step.enabled ? 'cursor-pointer' : 'text-gray-400'}
       onClick={onClick}
  >
    {step.name}
  </div>
)

export default Step;
