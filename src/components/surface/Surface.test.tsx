import * as React from "react";
import { render } from "../../../test/testUtils";
import * as Stories from "./Surface.stories";

describe("Surface", () => {
  it("matches snapshot for Center", () => {
    const { asFragment } = render(<Stories.Center />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot for Right", () => {
    const { asFragment } = render(<Stories.Right />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot for Left", () => {
    const { asFragment } = render(<Stories.Left />);
    expect(asFragment()).toMatchSnapshot();
  });
});
