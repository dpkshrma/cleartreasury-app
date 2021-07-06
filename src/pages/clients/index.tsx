import React from "react";
import { Client } from "./clients";
import { clientsQueryMock } from "./apollo/mocks";
import { ApolloProviderHoc } from "../../apollo-config/ApolloProviderHoc/apolloProviderHoc";

const ClientsContainer: React.FC = () => {
  return (
    <ApolloProviderHoc mocks={[clientsQueryMock]}>
      <Client />
    </ApolloProviderHoc>
  );
};

export default ClientsContainer;
