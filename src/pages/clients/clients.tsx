import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENT, GET_CLIENTS } from "./apollo/queries";

export const Clients: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const {
    data: singleData,
    loading: clientLoading,
    error: clientError,
  } = useQuery(GET_CLIENT, { variables: { id: 1 } });

  if (error || clientError)
    return (
      <p>{error && error.message ? error.message : clientError.message}</p>
    );
  if (loading || clientLoading) return <p>Loading...</p>;
  if (data && singleData)
    return (
      <>
        <div>
          <p>Single Client:</p>
          <h2>id: {singleData.client.id}</h2>
          <p>reference: {singleData.client.reference}</p>
          <p>name: {singleData.client.name}</p>
          <p>email: {singleData.client.email}</p>
        </div>
        <hr />
        <br />
        <br />
        <ul>
          {data.clients.map((client) => (
            <li key={client.id}>
              <h2>id: {client.id}</h2>
              <p>reference: {client.reference}</p>
              <p>name: {client.name}</p>
              <p>email: {client.email}</p>
              <hr />
              <br />
            </li>
          ))}
        </ul>
      </>
    );
  return null;
};
