import { graphql } from "msw";
import clients from "../data/clients";

export const clientHandlers = [
  graphql.query("getClient", (req, res, ctx) => {
    return res(
      ctx.data({
        client: clients.find((item) => item.id === req.variables.id),
      })
    );
  }),
  graphql.query("getClients", (req, res, ctx) => {
    return res(
      ctx.data({
        clients: clients,
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
        ...data,
      })
    );
  }),
];
