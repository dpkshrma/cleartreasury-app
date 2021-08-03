import * as React from "react";
import { Story, Meta } from "@storybook/react";
import Step, { State, StepProps } from "./Step";

export default {
  title: "Components/Step",
  component: Step,
} as Meta;

const Template: Story<StepProps> = (args) => <Step {...args} />;

export const Default = Template.bind({});
Default.args = {
  step: 0,
  title: "Default",
};

export const Enabled = Template.bind({});
Enabled.args = {
  step: 0,
  isEnabled: true,
  title: "Default",
};

export const Active = Template.bind({});
Active.args = {
  step: 0,
  title: "Active",
  state: State.ACTIVE,
};

export const Complete = Template.bind({});
Complete.args = {
  step: 0,
  title: "Complete",
  state: State.COMPLETE,
};
