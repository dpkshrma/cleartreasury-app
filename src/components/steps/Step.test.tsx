import * as React from "react";
import { render } from "../../../test/testUtils";
import * as Stories from "./Step.stories";

describe("Step", () => {
  it("matches snapshot for default state", () => {
    const { asFragment } = render(
      <Stories.Default {...Stories.Default.args} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot for enabled state", () => {
    const { asFragment } = render(
      <Stories.Enabled {...Stories.Enabled.args} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot for active state", () => {
    const { asFragment } = render(<Stories.Active {...Stories.Active.args} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot for complete state", () => {
    const { asFragment } = render(
      <Stories.Complete {...Stories.Complete.args} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
