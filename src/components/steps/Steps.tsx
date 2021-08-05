import React, { useState } from "react";
import { State } from "./Step";
import Surface from "../surface/Surface";

type Props = {
  nav?: React.ReactElement;
  children: React.ReactElement[];
  onComplete?(): void;
};

const Steps = ({ nav, children, onComplete }: Props): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState({});

  const Nav = (): JSX.Element | null =>
    nav ? (
      <div className="sm:flex justify-center sm:mx-4">
        {children.map((child, index) =>
          React.cloneElement(nav, {
            key: index,
            step: index,
            title: child.props.stepTitle,
            state:
              activeStep === index
                ? State.ACTIVE
                : formState[index] || State.DEFAULT,
            isEnabled: index <= activeStep,
            onClick: () => setActiveStep(index),
          })
        )}
      </div>
    ) : null;

  return (
    <>
      <Nav />

      <Surface align={Surface.Align.CENTER}>
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
      </Surface>
    </>
  );
};

type StepItemProps = {
  form?: any;
  stepTitle?: string;
  children?: React.ReactElement;
};

Steps.Step = ({ form, children, ...props }: StepItemProps): JSX.Element => {
  return React.cloneElement(children || form, { ...props });
};

export default Steps;
