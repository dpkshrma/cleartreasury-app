import * as React from "react";
import { Story, Meta } from "@storybook/react";
import SubmitNewPasswordForm, {
  SubmitNewPasswordFormProps,
} from "./SubmitNewPasswordForm";

export default {
  title: "Components/SubmitNewPasswordForm",
  component: SubmitNewPasswordForm,
} as Meta;

const Template: Story<SubmitNewPasswordFormProps> = (args) => (
  <SubmitNewPasswordForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: () => null,
  loading: false,
  invalidCode: false,
  passwordRef: React.createRef(),
};
