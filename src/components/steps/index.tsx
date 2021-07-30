import React, { useState } from "react";

const Steps: React.FC<{
  nav?: React.ReactElement;
  onComplete?(): void;
  children?: React.ReactElement[];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ nav, onComplete, children }) => {
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

export const StepItem: React.FC<{
  form?: any;
  title?: string;
}> = ({ form, children, ...props }) => {
  return React.cloneElement(children || form, { ...props });
};

export default Steps;
