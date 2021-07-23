import { API } from "aws-amplify";
import { renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { useQuery } from "../../../src/hooks/useQuery";
import { GET_CLIENTS } from "../../../src/graphql/clients/queries";
import { clientHandlers } from "../../../src/mocks/handlers/clientHandlers";

import "../../../configureAmplify";

// TODO: restructure mock handlers to make this more intuitive
const server = setupServer(clientHandlers[1]);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should not call the API if not given a query", async () => {
  jest.spyOn(API, "graphql");

  const { result } = renderHook(() => useQuery(null));

  expect(API.graphql).not.toHaveBeenCalled();
  expect(result.current.data).toBe(null);
  expect(result.current.error).toBe(null);
  expect(result.current.loading).toBe(false);
});

test.todo("should error when calling a query with variables if none are given");

test.todo("should error when calling a query with the wrong variables");

test.todo("should call a query without variables");

test("should call a query with variables", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useQuery(GET_CLIENTS, { cli_email: "test1@test.com" })
  );

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toHaveLength(2);
  expect(result.current.data).toMatchObject([
    {
      id: 1,
      reference: "ref_1",
      name: "Client 1",
      email: "test1@test.com",
    },
    {
      id: 4,
      reference: "ref_4",
      name: "Client 4",
      email: "test1@test.com",
    },
  ]);
});

test("should fetch new data when variables change", async () => {
  const { result, rerender, waitForNextUpdate, waitForValueToChange } =
    renderHook(({ query, variables }) => useQuery(query, variables), {
      initialProps: {
        query: GET_CLIENTS,
        variables: { cli_email: "test1@test.com" },
      },
    });

  await waitForNextUpdate();

  expect(result.current.data).toHaveLength(2);

  rerender({ query: GET_CLIENTS, variables: { cli_email: "test3@test.com" } });

  await waitForValueToChange(() => result.current.data);

  expect(result.current.data).toHaveLength(1);
  expect(result.current.data).toMatchObject([
    {
      id: 3,
      reference: "ref_3",
      name: "Client 3",
      email: "test3@test.com",
    },
  ]);
});
