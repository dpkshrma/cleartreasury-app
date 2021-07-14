import { renderHook } from "@testing-library/react-hooks";
import Amplify from "aws-amplify";
import { setupServer } from "msw/node";
import { useQuery } from "../../../src/helpers/hooks/useQuery";
import { GET_CLIENT } from "../../../src/graphql/clients/queries";
import { clientHandlers } from "../../../src/mocks/handlers/clientHandlers";

const server = setupServer(clientHandlers[0]);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

Amplify.configure({
  API: {
    graphql_endpoint: "https://backend.dev.com/",
  },
});

test("should fetch user by id", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useQuery(GET_CLIENT, { id: 1 })
  );
  await waitForNextUpdate();

  expect(result.current.data).toMatchObject({
    client: {
      id: 1,
      reference: "reference 1",
      name: "username 1",
      email: "test1@test.com",
    },
  });
});
