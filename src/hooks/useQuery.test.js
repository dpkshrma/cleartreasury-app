import { API } from "aws-amplify";
import { renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { useQuery } from "./useQuery";
import { GET_CLIENTS } from "../graphql/clients/queries";
import { clientHandlers } from "../mocks/handlers/clientHandlers";

import "../../configureAmplify";

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
      cli_id: 1,
      cli_reference: "ref_1",
      cli_name: "Client 1",
      ctc_first_name: "Test",
      ctc_last_name: "User_1",
      cli_email: "test1@test.com",
      cty_value: "PRIVATE",
    },
    {
      cli_id: 4,
      cli_reference: "ref_4",
      cli_name: "Client 4",
      ctc_first_name: "Test",
      ctc_last_name: "User_1",
      cli_email: "test1@test.com",
      cty_value: "CORPORATE",
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
      cli_id: 3,
      cli_reference: "ref_3",
      cli_name: "Client 3",
      ctc_first_name: "Test",
      ctc_last_name: "User_3",
      cli_email: "test3@test.com",
      cty_value: "PRIVATE",
    },
  ]);
});
