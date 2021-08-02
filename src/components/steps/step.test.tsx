import * as React from "react";
import { render } from "../../../test/testUtils";
import Step, { State } from "./step";

describe("Step", () => {
  /* eslint-disable no-console */
  it("matches snapshot for Default state", () => {
    const { asFragment } = render(
      <Step
        step={0}
        title="Default"
        isEnabled={true}
        onClick={() => console.log("next step")}
        state={State.DEFAULT}
      />,
      {}
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
