import * as React from "react";
import { Meta, Story } from "@storybook/react";
import Surface from "./Surface";

export default {
  title: "Components/Surface",
  component: Surface,
} as Meta;

export const Default: Story = () => <Surface>Children here</Surface>;

export const Center: Story = () => (
  <Surface align={Surface.Align.CENTER}>Children here</Surface>
);

export const Right: Story = () => (
  <Surface align={Surface.Align.RIGHT}>Children here</Surface>
);
