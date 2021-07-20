import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

export const useQuery = (
  queryName: string,
  variables?: any,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const response: any = await API.graphql(
          graphqlOperation(queryName, variables)
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
