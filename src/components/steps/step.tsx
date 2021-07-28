import React from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { StepType } from "./types/step.type";

const Step: React.FC<{
  step: StepType;
  index: number;
  isActive: boolean;
  onClick(): void;
}> = ({ step, index, isActive, onClick }) => {
  const enabledStepClasses = step.completed
    ? "cursor-pointer text-gray-400"
    : step.enabled
    ? "cursor-pointer"
    : "cursor-default text-gray-400";

  return (
    <div
      className={`w-1/3 h-12 ${isActive || step.completed ? "bg-white" : ""}`}
      onClick={onClick}
    >
      <div
        className={`h-1 ${
          isActive ? "bg-green-500" : step.completed ? "bg-gray-400" : ""
        }`}
      />
      <div className={`flex pt-2 pl-2 items-center ${enabledStepClasses}`}>
        <div
          className={`flex ${
            step.completed ? "items-start" : "items-baseline"
          }`}
        >
          {step.completed ? (
            CheckCircleIcon({ className: "w-8 h-8 flex-shrink-0 font-normal" })
          ) : (
            <span className="flex justify-center p-0.5 w-6 h-6 rounded-2xl text-xs text-white bg-teal-700">
              {index}
            </span>
          )}
          <span className="ml-2">{step.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Step;
