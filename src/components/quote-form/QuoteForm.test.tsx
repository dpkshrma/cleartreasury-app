import * as React from "react";
import { render } from "../../../test/testUtils";
import * as Stories from "./QuoteForm.stories";

describe("Quote Form", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <Stories.Default {...Stories.Default.args} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
