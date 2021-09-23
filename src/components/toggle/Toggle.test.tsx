import * as React from "react";
import { render } from "../../../test/testUtils";
import * as Stories from "./Toggle.stories";

describe("Toggle", () => {
  test("Default", () => {
    render(<Stories.Default id="toggle" checked={false} />);
  });
});
