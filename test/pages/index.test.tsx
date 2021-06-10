import React from "react";
import { render } from "../testUtils";
import { Dashboard } from "../../src/pages/index";

describe("Dashboard page", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Dashboard />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
