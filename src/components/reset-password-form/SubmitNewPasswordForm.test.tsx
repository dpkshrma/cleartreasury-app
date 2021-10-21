import * as nextRouter from "next/router";
import * as React from "react";
import { render } from "../../../test/testUtils";
import * as Stories from "./SubmitNewPasswordForm.stories";

jest.mock("next/router");
(nextRouter.useRouter as jest.Mock).mockResolvedValue({
  isReady: true,
});

describe("SubmitNewPasswordForm", () => {
  it("matches snapshot for default state", () => {
    const { asFragment } = render(
      <Stories.Default {...Stories.Default.args} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
