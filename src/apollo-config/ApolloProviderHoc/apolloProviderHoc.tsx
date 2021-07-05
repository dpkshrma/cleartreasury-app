import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ApolloProvider } from "@apollo/client";
import { client } from "../config";

interface ProviderProps {
  mocks?: [MockedResponse];
}

export const ApolloProviderHoc: React.FC<ProviderProps> = ({
  mocks,
  children,
}) => {
  if (mocks && !!mocks.length)
    return (
      <MockedProvider mocks={mocks}>
        <>{children}</>
      </MockedProvider>
    );
  return (
    <ApolloProvider client={client}>
      <>{children}</>
    </ApolloProvider>
  );
};
