import React from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";

export const State = {
  ACTIVE: "cursor-default border-t-4 border-green-500",
  COMPLETE: "cursor-pointer text-gray-400 border-t-4 border-gray-400",
  DEFAULT: "cursor-default border-t-0",
} as const;

type Values<T> = T[keyof T];

type Props = {
  step?: number;
  activeStep?: number;
  title?: string;
  state?: Values<typeof State>;
  isEnabled?: boolean;
  onClick?(): void;
};

const Step = ({
  step,
  title,
  isEnabled,
  onClick,
  state = State.DEFAULT,
}: Props): JSX.Element => {
  const handleOnClick = () => {
    if (!isEnabled) return;

    onClick();
  };
  return (
    <div
      className={`flex flex-1 pb-4 pt-3 px-2 ${state}`}
      onClick={handleOnClick}
    >
      {state === State.COMPLETE ? (
        CheckCircleIcon({ className: "w-7 h-7 flex-shrink-0 font-normal" })
      ) : (
        <span className="flex justify-center p-0.5 w-6 h-6 rounded-2xl text-xs text-white bg-teal-700">
          {step + 1}
        </span>
      )}
      <span className="ml-2">{title}</span>
    </div>
  );
};

export default Step;
