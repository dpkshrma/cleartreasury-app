import React from "react";

export const Form1: React.FC<{
  onComplete?(): void;
}> = ({ onComplete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do stuff
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Step 1</p>
      <button>Continue</button>
    </form>
  );
};

export const Form2A: React.FC<{
  onComplete?(): void;
}> = ({ onComplete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do stuff
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Step 2 A</p>
      <button>Continue</button>
    </form>
  );
};

export const Form2B: React.FC<{
  onComplete?(): void;
}> = ({ onComplete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do stuff
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Step 2 B</p>
      <button>Continue</button>
    </form>
  );
};

export const Form3: React.FC<{
  onComplete?(): void;
}> = ({ onComplete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do stuff
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Step 3</p>
      <button>Continue</button>
    </form>
  );
};
