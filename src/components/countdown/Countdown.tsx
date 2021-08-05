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
  progress?: boolean;
  animation?: boolean;
  text?: string;
};

const Countdown = ({
  time,
  onComplete,
  progress = false,
  text,
}: CountdownProps): JSX.Element => {
  const [ms, setMs] = React.useState(time);
  const [animation, setAnimation] = React.useState({
    loading: "",
    started: false,
    delay: "",
  });
  const [textField, setTextField] = React.useState(text);

  const { timer } = useInterval(() => {
    if (ms !== 0) setMs(ms - 1);
  }, 1);

  React.useEffect(() => {
    if (ms === 0) {
      clearInterval(timer);
      onComplete();
    }
  }, [ms]);

  React.useEffect(() => {
    if (animation.started) {
      if (!progress) {
        setAnimation(() => ({
          ...animation,
          started: false,
          loading: "",
          delay: "",
        }));
        setTimeout(() => {
          setAnimation(() => ({
            ...animation,
            loading: `rotate ${time}s linear both`,
            delay: `${time}s`,
          }));
        }, 10);
      } else {
        setAnimation(() => ({
          ...animation,
          started: false,
          loading: "",
        }));
        setTimeout(() => {
          setAnimation(() => ({
            ...animation,
            loading: `fill ${time}s linear 1`,
          }));
        }, 10);
      }
    } else {
      if (!progress) {
        setAnimation(() => ({
          ...animation,
          started: true,
          loading: `rotate ${time}s linear both`,
          delay: `${time}s`,
        }));
      } else {
        setAnimation(() => ({
          ...animation,
          started: true,
          loading: `fill ${time}s linear 1`,
        }));
      }
    }
    setTextField(text);
  }, [text]);

  return (
    <React.Fragment>
      {progress ? (
        <div className="grid justify-items-center">
          <div className="bg-green-100 border border-green-700 h-10 rounded w-80 mb-4">
            <div
              className="bg-green-600 h-full"
              style={{ animation: `${animation.loading}` }}
            ></div>
          </div>
          <span className="text-gray-400 text-base text-center block">
            {textField}
          </span>
        </div>
      ) : (
        <div className="flex">
          <div className="mr-2 mt-1">
            <div className="circular w-6 h-6 relative">
              <div className="z-30 w-5 h-5 absolute bg-white top-1/2 left-1/2 -mt-2.5 -ml-2.5 rounded-full"></div>
              <div className="circle">
                <div className="bar left absolute bg-white h-full w-full rounded-full clip-rect-bar">
                  <div
                    className={`progress absolute bg-green-500 z-10 h-full w-full rounded-full clip-rect-progress`}
                    style={{ animation: `${animation.loading}` }}
                  ></div>
                </div>
                <div className="bar right absolute bg-white h-full w-full transform rotate-180 rounded-full clip-rect-bar">
                  <div
                    className={`progress absolute bg-green-500 z-20 h-full w-full rounded-full clip-rect-progress transition`}
                    style={{
                      animation: `${animation.loading}`,
                      animationDelay: `${animation.delay}`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <span className="ml-2 text-lg text-gray-400">{textField}</span>
        </div>
      )}
    </React.Fragment>
  );
};

export default Countdown;
