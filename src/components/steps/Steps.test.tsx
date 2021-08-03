import * as React from "react";
import { render } from "../../../test/testUtils";
import { StepsStory } from "./Steps.stories";
import { act, cleanup, fireEvent, getByText } from "@testing-library/react";

describe("Steps", () => {
  let component: DocumentFragment;
  let firstChild: HTMLCanvasElement;

  beforeEach(() => {
    const { asFragment } = render(<StepsStory />);
    component = asFragment();
    firstChild = component.firstChild as HTMLCanvasElement;
  });
  afterEach(cleanup);

  it("matches snapshot for nested children", () => {
    expect(component).toMatchSnapshot();
  });

  describe("matches snapshot fragment", () => {
    it("for Amount text", () => {
      const span = getByText(firstChild, "Amount");
      expect(span).not.toBe(null);
      expect(span).toMatchSnapshot();
    });

    it("for Step 1 form", () => {
      const form = firstChild.querySelector("form");

      expect(form).not.toBe(null);
      expect(form).toMatchSnapshot();
    });

    it("for Step 2 form after Step 1 submit", async () => {
      const button = getByText(firstChild, "Continue");
      expect(button).not.toBe(null);

      await act(async () => {
        fireEvent.click(button);
      });

      const beneficiaryForm = firstChild.querySelector("form");
      expect(beneficiaryForm).toMatchSnapshot();
    });
  });
});
