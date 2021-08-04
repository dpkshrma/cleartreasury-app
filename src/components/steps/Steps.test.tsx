import * as React from "react";
import { render } from "../../../test/testUtils";
import { Default } from "./Steps.stories";
import { fireEvent, screen } from "@testing-library/react";

describe("Steps", () => {
  it("matches snapshot for nested children", () => {
    const { asFragment } = render(<Default />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("navigate to next step when submitting a form", async () => {
    render(<Default />);

    fireEvent.click(screen.getByText("Continue"));

    expect(screen.getByRole("heading")).toHaveTextContent("Form 2A");
  });
});
