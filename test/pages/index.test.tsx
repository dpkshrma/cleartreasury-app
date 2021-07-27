import React from "react";
import { render } from "../testUtils";
import Dashboard from "../../src/pages";

describe("Dashboard page", () => {
  it("matches snapshot", () => {
    const obj = { user: { username: "Test" } };
    const { asFragment } = render(<Dashboard client={obj} />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
