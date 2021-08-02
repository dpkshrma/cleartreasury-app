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
    <div className="circular w-6 h-6 relative">
      <div className="z-30 w-5 h-5 absolute bg-white top-1/2 left-1/2 -mt-2.5 -ml-2.5 rounded-full"></div>
      <div className="circle">
        <div className="bar left absolute bg-white h-full w-full rounded-full clip-rect-bar">
          <div className="progress absolute bg-green-500 z-10 h-full w-full rounded-full clip-rect-progress animate-loading"></div>
        </div>
        <div className="bar right absolute bg-white h-full w-full transform rotate-180 rounded-full clip-rect-bar">
          <div className="progress absolute bg-green-500 z-20 h-full w-full rounded-full clip-rect-progress animate-loading transition delay-4000"></div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
