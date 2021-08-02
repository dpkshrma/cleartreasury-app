import * as React from "react";
import { Meta } from "@storybook/react";
import Countdown from "./Countdown";

export default {
  title: "Components/Countdown",
  component: Countdown,
} as Meta;

export const Primary: React.VFC<Record<string, never>> = () => (
  <Countdown time={2} onComplete={() => console.log("Finished")} /> // eslint-disable-line no-console
);
