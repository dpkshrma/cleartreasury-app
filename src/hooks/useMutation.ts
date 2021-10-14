import * as React from "react";
import { API } from "aws-amplify";
import { DocumentNode } from "graphql-tag-ts";
import isDeepEqual from "fast-deep-equal/react";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql";

type MutationState = {
  data: any;
  loading: boolean;
  error: any;
};

type Input = {
  [name: string]: any;
};

export const useMutation = (
  query?: DocumentNode,
  inputData?: Input,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
): MutationState => {
  const [data, setData] = React.useState<GraphQLResult | null>(null);
  const [loading, setLoading] = React.useState<boolean>(!!query);
  const [error, setError] = React.useState(null);

  const inputDataRef = React.useRef(inputData);

  if (!isDeepEqual(inputDataRef.current, inputData)) {
    inputDataRef.current = inputData;
  }

  React.useEffect(() => {
    if (query) {
      (async () => {
        try {
          setLoading(true);

          const { data }: any = await API.graphql({
            query,
            variables: { input: inputData },
            authMode:
              process.env.NODE_ENV === "test"
                ? GRAPHQL_AUTH_MODE.API_KEY
                : GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          });

          const queryName = query.definitions[0].name.value;

          setData(data[queryName]);
          onSuccess && onSuccess(data);
        } catch (err) {
          setError(err);
          onError && onError(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [query, inputDataRef.current]);

  return {
    data,
    loading,
    error,
  };
};
