import * as React from "react";
import { Story, Meta } from "@storybook/react";
import Toggle, { ToggleProps } from "./Toggle";

export default {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    actions: {
      handles: ["submit [data-event]"],
    },
  },
} as Meta;

export const Default: Story<ToggleProps> = () => {
  const [bindIndex, setBindIndex] = React.useState(null);

  const toggleReason = (index) => {
    if (index == bindIndex) {
      setBindIndex(null);
    } else {
      setBindIndex(index);
    }
  };

  return (
    <Toggle
      id="toggle"
      checked={bindIndex == "toggle" ? true : false}
      onChange={() => toggleReason("toggle")}
    />
  );
};
