import * as React from "react";
import * as nextRouter from "next/router";
import { render } from "../../../test/testUtils";
import * as Stories from "./InitiatePasswordResetForm.stories";

jest.mock("next/router");
(nextRouter.useRouter as jest.Mock).mockResolvedValue({
  isReady: true,
});

describe("InitiatePasswordResetForm", () => {
  it("matches snapshot for default state", () => {
    const { asFragment } = render(
      <Stories.Default {...Stories.Default.args} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
