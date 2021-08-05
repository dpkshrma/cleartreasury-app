import * as React from "react";
import { Story, Meta } from "@storybook/react";
import Header, { HeaderProps } from "./Header";

export default {
  title: "Components/Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  setSidebarOpen: "any",
  client: "Mr Fantastic",
  sidebarOpen: true,
};
