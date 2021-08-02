import * as React from "react";

const useInterval = (
  callback: () => void,
  delay: number
): { timer: number | null } => {
  const timer = React.useRef<number | null>(null);
  const savedCallback = React.useRef(null);

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      timer.current = window.setInterval(tick, delay);
      return () => clearInterval(timer.current);
    }
  }, [delay]);

  return { timer: timer.current };
};

type CountdownProps = {
  time: number;
  onComplete: () => void;
};

const Countdown = ({ time, onComplete }: CountdownProps): JSX.Element => {
  const [ms, setMs] = React.useState(time);

  const { timer } = useInterval(() => {
    if (ms !== 0) setMs(ms - 1);
  }, 1);

  React.useEffect(() => {
    if (ms === 0) {
      clearInterval(timer);
      onComplete();
    }
  }, [ms]);

  return (
    <svg height="28" width="28">
      <circle
        className="circle"
        cx="14"
        cy="14"
        r="12"
        stroke="#eaeaea"
        strokeWidth="2"
        fillOpacity="0"
      />
      <circle
        cx="14"
        cy="14"
        r="12"
        stroke="#01D0A2"
        strokeWidth="2"
        fillOpacity="0"
      />
    </svg>
  );
};

export default Countdown;
