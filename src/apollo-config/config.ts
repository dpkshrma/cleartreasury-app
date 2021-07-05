import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

export const cache = new InMemoryCache();

const link = createHttpLink({
  /** graphql endpoint */
  uri: "http://localhost:4000/",
});

export const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([link]),
  cache,
  resolvers: {},
  defaultOptions: {
    query: {
      errorPolicy: "all",
    },
  },
});
