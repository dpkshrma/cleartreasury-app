type Props = {
  onComplete?(): void;
};

export const Form1 = ({ onComplete }: Props): JSX.Element => {
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

export const Form2A = ({ onComplete }: Props): JSX.Element => {
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

export const Form2B = ({ onComplete }: Props): JSX.Element => {
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

export const Form3 = ({ onComplete }: Props): JSX.Element => {
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
