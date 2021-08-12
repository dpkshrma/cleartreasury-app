import * as React from "react";
import { render, screen, waitFor } from "../../../test/testUtils";
import * as Stories from "./QuoteForm.stories";

describe("Quote Form", () => {
  it("matches snapshot", async () => {
    const { asFragment } = render(
      <Stories.Default {...Stories.Default.args} />
    );

    await waitFor(() => screen.getByRole("heading"));

    expect(asFragment()).toMatchSnapshot();
  });
});
