import React, { useState } from "react";
import { State } from "./Step";
import Surface from "../surface/Surface";

type StepItemProps = {
  stepTitle?: string;
  form?: React.ReactElement;
  children?: React.ReactElement;
};

type StepsProps = {
  nav?: React.ReactElement;
  children: React.ReactElement[];
  onComplete?(): void;
  goBack?: number;
};

const Step = ({ form, children, ...props }: StepItemProps): JSX.Element => {
  return React.cloneElement(children || form, { ...props });
};

const Steps = ({
  nav,
  children,
  onComplete,
  goBack,
}: StepsProps): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState({});

  React.useEffect(() => {
    if (goBack !== undefined) {
      setActiveStep(goBack);
    }
  }, [goBack]);

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
              onComplete: (data) => {
                child.props.form?.props.onComplete &&
                  child.props.form.props.onComplete(data);

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

Steps.Step = Step;

export default Steps;
