import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";

type MutationState = {
  data: any;
  loading: boolean;
  error: any;
};

type Input = {
  [name: string]: any;
};

export const useMutation = (
  query: string,
  inputData?: Input,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
): MutationState => {
  const [data, setData] = useState<GraphQLResult>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const response: any = await API.graphql(
          graphqlOperation(query, inputData)
        );
        const data = response.data;
        setData(data);
        onSuccess && onSuccess(data);
      } catch (err) {
        setError(err);
        onError && onError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    data,
    loading,
    error,
  };
};
