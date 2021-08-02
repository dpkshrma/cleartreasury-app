import * as React from "react";
import { render } from "../testUtils";
import Dashboard from "../../src/pages/index";

describe("Dashboard page", () => {
  it("matches snapshot for PRIVATE client", () => {
    const client = {
      cli_name: "",
      cli_email: "test-user@example.com",
      cty_value: "PRIVATE",
      cli_reference: "PRIV01",
      ctc_first_name: "Test",
      ctc_last_name: "User",
    };

    const { asFragment } = render(<Dashboard client={client} />, {});
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot for CORPORATE client", () => {
    const client = {
      cli_name: "Test Company",
      cli_email: "test-company@example.com",
      cty_value: "CORPORATE",
      cli_reference: "CORP01",
      ctc_first_name: "Test",
      ctc_last_name: "User",
    };

    const { asFragment } = render(<Dashboard client={client} />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
