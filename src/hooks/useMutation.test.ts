import gql from "graphql-tag";
import { API } from "aws-amplify";
import { graphql } from "msw";
import { setupServer } from "msw/node";
import { renderHook } from "@testing-library/react-hooks";
import { useMutation } from "./useMutation";

type MockData = {
  message: string;
};

const MOCK_MUTATION = gql`
  mutation mockMutation($input: MockMutationInput!) {
    mockMutation(input: $input) {
      message
    }
  }
`;

const mockMutationHandler = graphql.mutation(
  "mockMutation",
  (req, res, ctx) => {
    return res(
      ctx.data({
        mockMutation: {
          message: req.variables.input.message,
        },
      })
    );
  }
);

const server = setupServer(mockMutationHandler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should not call the API if not given a query", async () => {
  jest.spyOn(API, "graphql");

  const { result } = renderHook(() => useMutation<null>(null));

  expect(API.graphql).not.toHaveBeenCalled();
  expect(result.current.data).toBe(null);
  expect(result.current.error).toBe(null);
  expect(result.current.loading).toBe(false);
});

test.todo(
  "should error when calling a mutation that requires variables but none are given"
);

test.todo("should error when calling a query with the wrong variables");

test.todo("should call a query without variables");

test("should call a mutation with input data", async () => {
  const inputData = {
    message: "Success",
  };

  const { result, waitForNextUpdate } = renderHook(() =>
    useMutation<MockData>(MOCK_MUTATION, inputData)
  );

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeNull();
  expect(result.current.data).toMatchObject(inputData);
});
