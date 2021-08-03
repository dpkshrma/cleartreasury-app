import * as React from "react";
import { Meta } from "@storybook/react";
import Step, { State } from "./Step";

export default {
  title: "Components/Step",
  component: Step,
} as Meta;

export const StepStory: React.VFC<Record<string, never>> = () => (
  <>
    {/* eslint-disable no-console */}
    <Step
      step={0}
      title="Default"
      isEnabled={true}
      onClick={() => console.log("next step")}
      state={State.DEFAULT}
    />
    <br />
    <Step
      step={0}
      title="Completed"
      isEnabled={false}
      onClick={() => console.log("next step")}
      state={State.COMPLETE}
    />
    <br />
    <Step
      step={0}
      title="Active"
      isEnabled={true}
      onClick={() => console.log("next step")}
      state={State.ACTIVE}
    />
  </>
);
