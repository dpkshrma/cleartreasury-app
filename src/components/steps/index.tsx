import React, { useState } from "react";

type Props = {
  nav?: React.ReactElement;
  children: React.ReactElement[];
};

const Steps = ({ nav, children }: Props): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);

  const Nav = (): any =>
    nav
      ? children.map((child, index) =>
          React.cloneElement(nav, {
            key: index,
            step: index,
            title: child.props.title,
            activeStep: activeStep,
            onClick: () => setActiveStep(index),
          })
        )
      : null;

  return (
    <div className="tabs w-full px-48 pt-20">
      <div className="flex justify-between">
        <Nav />
      </div>

      <div className="pt-10">
        {children.map((child, index) => {
          return (
            index === activeStep &&
            React.cloneElement(child, {
              onComplete: () => setActiveStep((activeStep) => activeStep + 1),
            })
          );
        })}
      </div>
    </div>
  );
};

type StepItemProps = {
  form?: any;
  title?: string;
  children?: React.ReactElement;
};

export const StepItem = ({
  form,
  children,
  ...props
}: StepItemProps): JSX.Element => {
  return React.cloneElement(children || form, { ...props });
};

export default Steps;
