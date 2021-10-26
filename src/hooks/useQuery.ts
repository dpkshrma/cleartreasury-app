import * as React from "react";
import { DocumentNode } from "graphql-tag-ts";
import isDeepEqual from "fast-deep-equal/react";
import { API } from "aws-amplify";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql";

type QueryState<Data> = {
  data: Data;
  loading: boolean;
  error: any;
};

type Variables = {
  [name: string]: any;
};

export const useQuery = <Data>(
  query?: DocumentNode,
  variables?: Variables,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
): QueryState<Data> => {
  const [data, setData] = React.useState<Data | null>(null);
  const [loading, setLoading] = React.useState<boolean>(!!query);
  const [error, setError] = React.useState(null);

  const variablesRef = React.useRef(variables);

  if (!isDeepEqual(variablesRef.current, variables)) {
    variablesRef.current = variables;
  }

  React.useEffect(() => {
    if (query) {
      (async () => {
        try {
          setLoading(true);

          const { data } = (await API.graphql({
            query,
            variables,
            authMode:
              process.env.NODE_ENV === "test"
                ? GRAPHQL_AUTH_MODE.API_KEY
                : GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })) as GraphQLResult<Data>;

          const queryName = query.definitions[0].name.value;

          setData(data[queryName]);
          onSuccess && onSuccess(data[queryName]);
        } catch (err) {
          setError(err);
          onError && onError(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [query, variablesRef.current]);

  return {
    data,
    loading,
    error,
  };
};
