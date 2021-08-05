import * as React from "react";
import { Meta } from "@storybook/react";
import Countdown from "./Countdown";

export default {
  title: "Components/Countdown",
  component: Countdown,
} as Meta;

const delay = (time: number) => {
  setTimeout(() => {
    console.log("Finished"); // eslint-disable-line no-console
  }, time);
};

export const Primary: React.VFC<Record<string, never>> = () => (
  <Countdown time={10} onComplete={() => delay(20000)} /> // eslint-disable-line no-console
);

export const Text: React.VFC<Record<string, never>> = () => {
  const [text, setText] = React.useState("1001");

  setTimeout(() => {
    setText("2100");
  }, 5000);

  return (
    <Countdown time={10} onComplete={() => delay(20000)} text={text} /> // eslint-disable-line no-console
  );
};

export const Progress: React.VFC<Record<string, never>> = () => {
  const [text, setText] = React.useState(
    "This quote will expire in 10 seconds"
  );

  setTimeout(() => {
    setText("text changed!");
  }, 2000);

  return (
    <Countdown time={10} onComplete={() => delay(20000)} progress text={text} /> // eslint-disable-line no-console
  );
};
