import { renderHook } from "@testing-library/react-hooks";
import Amplify from "aws-amplify";
import { setupServer } from "msw/node";
import { useQuery } from "../../../src/helpers/hooks/useQuery";
import { clientHandlers } from "../../../src/mocks/handlers/clientHandlers";
import { CREATE_CLIENT } from "../../../src/graphql/clients/mutations";

const server = setupServer(clientHandlers[2]);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

Amplify.configure({
  API: {
    graphql_endpoint: "https://backend.dev.com/",
  },
});

test("should create new user", async () => {
  const data = {
    id: 4,
    reference: "123454",
    email: "test4@test.com",
    name: "test4",
  };
  const { result, waitForNextUpdate } = renderHook(() =>
    useQuery(CREATE_CLIENT, data)
  );
  await waitForNextUpdate();
  expect(result.current.data).toMatchObject(data);
});
