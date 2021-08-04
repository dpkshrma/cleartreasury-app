import * as React from "react";
import { Meta } from "@storybook/react";
import Surface, { Align } from "./Surface";

export default {
  title: "Components/Surface",
  component: Surface,
} as Meta;

export const Center: React.VFC<Record<string, never>> = () => (
  <Surface>Children here</Surface>
);

export const Right: React.VFC<Record<string, never>> = () => (
  <Surface align={Align.RIGHT}>Children here</Surface>
);

export const Left: React.VFC<Record<string, never>> = () => (
  <Surface align={Align.LEFT}>Children here</Surface>
);
