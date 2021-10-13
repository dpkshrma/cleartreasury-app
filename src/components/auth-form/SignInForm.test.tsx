import * as React from "react";
import { render } from "../../../test/testUtils";
import { Default } from "./SignInForm.stories";

describe("SignInForm", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Default />);
    expect(asFragment()).toMatchSnapshot();
  });
});
