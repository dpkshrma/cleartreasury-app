import React, { useState } from "react";
import { State } from "./step";

type Props = {
  nav?: React.ReactElement;
  children: React.ReactElement[];
  onComplete?(): void;
};

const Steps = ({ nav, children, onComplete }: Props): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState({});

  const Nav = (): any =>
    nav
      ? children.map((child, index) =>
          React.cloneElement(nav, {
            key: index,
            step: index,
            title: child.props.title,
            state:
              activeStep === index
                ? State.ACTIVE
                : formState[index] || State.DEFAULT,
            isEnabled: index <= activeStep,
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
              key: index,
              onComplete: () => {
                if (activeStep === children.length - 1) {
                  onComplete();
                } else {
                  setFormState(() => ({
                    ...formState,
                    [activeStep]: State.COMPLETE,
                  }));
                  setActiveStep((activeStep) => activeStep + 1);
                }
              },
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

Steps.Step = ({ form, children, ...props }: StepItemProps): JSX.Element => {
  return React.cloneElement(children || form, { ...props });
};

export default Steps;
