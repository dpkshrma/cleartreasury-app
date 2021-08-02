import * as React from "react";
import { render } from "../../../test/testUtils";
import { StepStory } from "./step.stories";

describe("Step", () => {
  /* eslint-disable no-console */
  it("matches snapshot for all states", () => {
    const { asFragment } = render(<StepStory />);

    expect(asFragment()).toMatchSnapshot();
  });
});
