import { graphql } from "msw";
import clients from "../data/clients";

export const clientHandlers = [
  graphql.query("getClient", (req, res, ctx) => {
    return res(
      ctx.data({
        getClient: clients.find((item) => item.id === req.variables.id),
      })
    );
  }),

  graphql.query("getClients", (req, res, ctx) => {
    return res(
      ctx.data({
        getClients: clients.filter(
          (client) => client.email === req.body.variables.cli_email
        ),
      })
    );
  }),

  graphql.mutation("CreateClient", (req, res, ctx) => {
    const data = req.variables as {
      id: number;
      reference: string;
      email: string;
      name: string;
    };

    clients.push(data);

    return res(
      ctx.data({
        CreateClient: data,
      })
    );
  }),
];
