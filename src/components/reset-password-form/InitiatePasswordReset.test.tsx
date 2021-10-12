import * as React from "react";
import { render } from "../../../test/testUtils";
import * as Stories from "./InitiatePasswordResetForm.stories";

describe("InitiatePasswordResetForm", () => {
  it("matches snapshot for default state", () => {
    const { asFragment } = render(
      <Stories.Default {...Stories.Default.args} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
