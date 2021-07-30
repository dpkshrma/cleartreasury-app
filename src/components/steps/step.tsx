import React from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";

const Step: React.FC<{
  step?: number;
  title?: string;
  activeStep?: number;
  onClick?(): void;
}> = ({ step, title, activeStep, onClick }) => {
  const isActive = activeStep === step;
  const isCompleted = activeStep > step;
  const isEnabled = activeStep >= step;

  const enabledStepClasses = isCompleted
    ? "cursor-pointer text-gray-400"
    : isEnabled
    ? "cursor-pointer"
    : "cursor-default text-gray-400";

  const handleOnClick = () => {
    if (!isEnabled) return;

    onClick();
  };
  return (
    <div
      className={`w-1/3 h-12 ${isActive || isCompleted ? "bg-white" : ""}`}
      onClick={handleOnClick}
    >
      <div
        className={`h-1 ${
          isActive ? "bg-green-500" : isCompleted ? "bg-gray-400" : ""
        }`}
      />
      <div className={`flex pt-2 pl-2 items-center ${enabledStepClasses}`}>
        <div
          className={`flex ${isCompleted ? "items-start" : "items-baseline"}`}
        >
          {isCompleted ? (
            CheckCircleIcon({ className: "w-8 h-8 flex-shrink-0 font-normal" })
          ) : (
            <span className="flex justify-center p-0.5 w-6 h-6 rounded-2xl text-xs text-white bg-teal-700">
              {step + 1}
            </span>
          )}
          <span className="ml-2">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default Step;
