import React from "react";
import { DocumentNode } from "graphql-tag-ts";
import isDeepEqual from "fast-deep-equal/react";
import { API, graphqlOperation } from "aws-amplify";

export const useQuery = (
  query: DocumentNode,
  variables?: any,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
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

          const { data }: any = await API.graphql(
            graphqlOperation(query, variables)
          );

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
