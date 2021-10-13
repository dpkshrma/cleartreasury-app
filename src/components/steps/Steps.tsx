import * as React from "react";
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
  stepBack?(step?: number): void;
  onComplete?(): void;
};

const Step = ({ form, children, ...props }: StepItemProps): JSX.Element => {
  return React.cloneElement(children || form, { ...props });
};

const Steps = ({
  nav,
  children,
  stepBack,
  onComplete,
}: StepsProps): JSX.Element => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formState, setFormState] = React.useState({});

  React.useEffect(() => {
    if (activeStep < 0) stepBack();
  }, [activeStep]);

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
              stepBack: (step: number) => {
                if (step === activeStep) {
                  stepBack(step);
                } else {
                  isNaN(step)
                    ? setActiveStep(activeStep - 1)
                    : setActiveStep(step);
                }
              },
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
