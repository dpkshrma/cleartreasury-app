import * as React from "react";
import { Meta } from "@storybook/react";
import Surface from "./Surface";

export default {
  title: "Components/Surface",
  component: Surface,
} as Meta;

export const Primary: React.VFC<Record<string, never>> = () => (
  <Surface>Children here</Surface>
);
