import * as React from "react";
import { CheckIcon } from "@heroicons/react/solid";
import classNames from "classnames";

export const State = {
  ACTIVE:
    "cursor-default text-gray-600 border-green-600 sm:bg-theme-color-surface",
  COMPLETE:
    "cursor-pointer text-gray-400 border-gray-400 transition hover:text-teal-700 hover:border-teal-700",
  DEFAULT: "cursor-default text-gray-600 border-transparent",
} as const;

type Values<T> = T[keyof T];

export interface StepProps {
  step?: number;
  title?: string;
  state?: Values<typeof State>;
  isEnabled?: boolean;
  onClick?(): void;
}

const Step = ({
  step,
  title,
  isEnabled,
  onClick,
  state = State.DEFAULT,
}: StepProps): JSX.Element => {
  const handleOnClick = () => {
    if (!isEnabled) return;
    onClick();
  };

  const stepClasses = classNames(
    `group flex flex-1`,
    `px-2 py-1 md:pb-4 md:pt-3`,
    `text-sm lg:text-base md:leading-tight`,
    `border-l-4 sm:border-l-0 sm:border-t-4`,
    `max-w-xs`,
    state
  );

  const iconClasses = classNames(
    `flex flex-shrink-0 justify-center`,
    `w-6 h-6`,
    `rounded-2xl`,
    `text-xs text-white`,
    state === State.COMPLETE
      ? `items-center bg-gray-400 transition group-hover:bg-teal-700`
      : `pt-0.5 bg-teal-700`
  );

  return (
    <div className={stepClasses} onClick={handleOnClick}>
      <span className={iconClasses}>
        {state === State.COMPLETE ? (
          <CheckIcon className="w-3 h-3 flex-shrink-0" />
        ) : (
          step + 1
        )}
      </span>
      <span className="ml-2">{title}</span>
    </div>
  );
};

export default Step;
