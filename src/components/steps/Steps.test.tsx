import * as React from "react";
import { render } from "../../../test/testUtils";
import { StepsStory } from "./Steps.stories";

describe("Steps", () => {
  it("matches snapshot for nested children", () => {
    const { asFragment } = render(<StepsStory />);

    expect(asFragment()).toMatchSnapshot();
  });
});
