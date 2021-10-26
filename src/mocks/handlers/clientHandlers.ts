import { graphql } from "msw";
import clients from "../data/clients.json";

export const clientHandlers = [
  graphql.query("getClient", (req, res, ctx) => {
    return res(
      ctx.data({
        getClient: clients.find((item) => item.cli_id === req.variables.id),
      })
    );
  }),

  graphql.query("getClients", (req, res, ctx) => {
    let returnedClients = [];

    // In test we can filter for email
    const testClients = clients.filter(
      (client) => client.cli_email === req.body.variables.cli_email
    );

    if (testClients.length) {
      returnedClients = testClients;
    } else {
      // Return 2 clients
      const fakeClients = clients
        .filter((client) => client.cli_email === "test1@test.com")
        .map((client) => ({
          ...client,
          cli_email: req.body.variables.cli_email,
        }));

      returnedClients = fakeClients;
    }

    return res(
      ctx.data({
        getClients: returnedClients,
      })
    );
  }),

  graphql.mutation("CreateClient", (req, res, ctx) => {
    const data = req.variables as {
      cli_id: number;
      cli_reference: string;
      cli_email: string;
      cli_name: string;
      ctc_first_name: string;
      ctc_last_name: string;
      cty_value: "PRIVATE" | "CORPORATE";
    };

    clients.push(data);

    return res(
      ctx.data({
        CreateClient: data,
      })
    );
  }),
];
