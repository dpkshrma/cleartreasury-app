import * as React from "react";
import { render } from "../../../test/testUtils";
import { Default } from "./NewPasswordForm.stories";

describe("NewPasswordForm", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Default {...Default.args} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
