import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";

import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    clients: [Client!]!
    client: Client
  }

  type Client {
    id: ID!
    reference: String
    name: String
    email: String
  }
`;

export const schemaLink = new SchemaLink({
  schema: makeExecutableSchema({
    typeDefs,
  }),
});
