import gql from "graphql-tag";
import { API } from "aws-amplify";
import { graphql } from "msw";
import { setupServer } from "msw/node";
import { renderHook } from "@testing-library/react-hooks";
import { useQuery } from "./useQuery";

type MockData = Array<{
  id: number;
  email: string;
}>;

const mockData: MockData = [
  {
    id: 1,
    email: "test1@example.com",
  },
  {
    id: 2,
    email: "test1@example.com",
  },
  {
    id: 3,
    email: "test2@example.com",
  },
];

export const MOCK_QUERY = gql`
  query mockQuery($email: String!) {
    mockQuery(email: $email) {
      id
      email
    }
  }
`;

const mockQueryHandler = graphql.query("mockQuery", (req, res, ctx) => {
  return res(
    ctx.data({
      mockQuery: mockData.filter(
        ({ email }) => email === req.body.variables.email
      ),
    })
  );
});

const server = setupServer(mockQueryHandler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should not call the API if not given a query", async () => {
  jest.spyOn(API, "graphql");

  const { result } = renderHook(() => useQuery<null>(null));

  expect(API.graphql).not.toHaveBeenCalled();
  expect(result.current.data).toBe(null);
  expect(result.current.error).toBe(null);
  expect(result.current.loading).toBe(false);
});

test.todo(
  "should error when calling a query that requires variables but none are given"
);

test.todo("should error when calling a query with the wrong variables");

test.todo("should call a query without variables");

test("should call a query with variables", async () => {
  const testEmail = "test1@example.com";

  const { result, waitForNextUpdate } = renderHook(() =>
    useQuery<MockData>(MOCK_QUERY, { email: testEmail })
  );

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeNull();
  expect(result.current.data).toHaveLength(2);
  expect(result.current.data).toMatchObject(
    mockData.filter(({ email }) => email === testEmail)
  );
});

test("should fetch new data when variables change", async () => {
  let testEmail = "test1@example.com";

  const { result, rerender, waitForNextUpdate, waitForValueToChange } =
    renderHook(({ query, variables }) => useQuery<MockData>(query, variables), {
      initialProps: {
        query: MOCK_QUERY,
        variables: { email: testEmail },
      },
    });

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeNull();
  expect(result.current.data).not.toBeNull();

  testEmail = "test2@example.com";
  rerender({ query: MOCK_QUERY, variables: { email: testEmail } });

  await waitForValueToChange(() => result.current.data);

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeNull();
  expect(result.current.data).toHaveLength(1);
  expect(result.current.data).toMatchObject(
    mockData.filter(({ email }) => email === testEmail)
  );
});
