import * as React from "react";
import { render } from "../../../test/testUtils";
import * as Stories from "./ChooseAccount.stories";
import { fireEvent } from "@testing-library/react";

describe("ChooseAccount", () => {
  it("matches snapshot choose account component", () => {
    const onAccountSelect = jest.fn();

    const { asFragment, getByText } = render(
      <Stories.Default
        {...Stories.Default.args}
        onAccountSelect={onAccountSelect}
      />
    );

    fireEvent.click(getByText("cli_name_1").closest("a"));

    expect(onAccountSelect).toBeCalled();
    expect(asFragment()).toMatchSnapshot();
  });
});
