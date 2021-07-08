import React from "react";
import { Clients } from "./clients";
import { clientByIdMock, clientsQueryMock } from "./apollo/mocks";
import { ApolloProviderHoc } from "../../apollo-config/ApolloProviderHoc/apolloProviderHoc";

const ClientsContainer: React.FC = () => {
  return (
    <ApolloProviderHoc mocks={[clientsQueryMock, clientByIdMock]}>
      <Clients />
    </ApolloProviderHoc>
  );
};

export default ClientsContainer;
