import * as Factory from "factory.ts";
import { MockedResponse } from "@apollo/client/testing";
import { GET_CLIENT, GET_CLIENTS } from "./queries";

export const ClientsMock = Factory.Sync.makeFactory({
  __typename: "Clients",
  id: Factory.each((i) => i + 1),
  reference: Factory.each((i) => `C00001390${i + 1}`),
  name: Factory.each((i) => `CLEAR CURRENCY LLP${i + 1}`),
  email: Factory.each((i) => `test-clients+signup@clearcurrency.co.uk${i + 1}`),
});

const clients = ClientsMock.buildList(2);

export const clientByIdMock: MockedResponse = {
  request: {
    query: GET_CLIENT,
    variables: { id: 1 },
  },
  result: {
    data: {
      client: clients.find((item) => item.id === 1),
    },
  },
};

export const clientsQueryMock: MockedResponse = {
  request: {
    query: GET_CLIENTS,
  },
  result: {
    data: {
      clients: clients,
    },
  },
};
