import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { GET_CLIENT, GET_CLIENTS } from "./graphql/queries";

export const Clients: React.FC = () => {
  const [client, setClient] = useState(null);
  const [clients, setClients] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClient = async () => {
    try {
      if (!client) {
        setIsLoading(true);

        const clientResponse: any = await API.graphql(
          graphqlOperation(GET_CLIENT, { id: 1 })
        );

        if (
          clientResponse &&
          clientResponse.data &&
          clientResponse.data.client
        ) {
          setClient(clientResponse.data.client);
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      if (!clients) {
        setIsLoading(true);

        const clientsResponse: any = await API.graphql(
          graphqlOperation(GET_CLIENTS)
        );

        if (
          clientsResponse &&
          clientsResponse.data &&
          clientsResponse.data.clients
        ) {
          setClients(clientsResponse.data.clients);
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
    fetchClients();
  }, []);

  if (error) return <p>{error && error.message && error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {client && (
        <div>
          <div>
            <p>Single Client:</p>
            <hr />
            <h2>id: {client.id}</h2>
            <p>reference: {client.reference}</p>
            <p>name: {client.name}</p>
            <p>email: {client.email}</p>
          </div>
          <hr />
          <br />
          <br />
        </div>
      )}
      {clients && clients.length && (
        <div>
          <p>Clients List</p>
          <hr />
          <ul>
            {clients.map((client) => (
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
        </div>
      )}
    </>
  );
  return null;
};
