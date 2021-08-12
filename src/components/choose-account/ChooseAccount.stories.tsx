import * as React from "react";
import { Story, Meta } from "@storybook/react";
import ChooseAccount, { Props } from "./ChooseAccount";
import { Client } from "../../pages/_app";

export const accounts: Client[] = [
  {
    cli_name: "cli_name_1",
    cli_email: "cli_email_1",
    cty_value: "PRIVATE",
    cli_reference: "cty_reference_1",
    ctc_first_name: "ctc_first_name_1",
    ctc_last_name: "ctc_last_name_1",
  },
  {
    cli_name: "cli_name_2",
    cli_email: "cli_email_2",
    cty_value: "PRIVATE",
    cli_reference: "cty_reference_2",
    ctc_first_name: "ctc_first_name_2",
    ctc_last_name: "ctc_last_name_2",
  },
];

export default {
  title: "Components/ChooseAccount",
  component: ChooseAccount,
} as Meta;

const Template: Story<Props> = (args) => <ChooseAccount {...args} />;

export const Default = Template.bind({});
Default.args = {
  accounts: accounts,
};
