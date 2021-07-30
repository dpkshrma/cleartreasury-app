import React, { useState } from "react";

const Steps: React.FC<{
  nav?: React.ReactElement;
  onComplete?(): void;
  children?: React.ReactElement[];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ nav, onComplete, children }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="tabs w-full px-48 pt-20">
      {nav &&
        React.cloneElement(nav, {
          activeStep,
          setActiveStep,
        })}

      <div className="pt-10">
        {children &&
          children.map(
            (child, index) =>
              index === activeStep &&
              React.cloneElement(child, {
                // TODO: add this when we have onComplete for all child components
                // onComplete: setActiveStep(prevState => prevState + 1),
              })
          )}
      </div>
    </div>
  );
};

export default Steps;
