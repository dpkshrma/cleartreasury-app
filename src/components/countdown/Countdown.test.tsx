import * as React from "react";
import { render } from "../../../test/testUtils";
import { Primary } from "./Countdown.stories";

describe("Countdown", () => {
  it("matches snapshot for icon", () => {
    const { asFragment } = render(<Primary />);
    expect(asFragment()).toMatchSnapshot();
  });
});
