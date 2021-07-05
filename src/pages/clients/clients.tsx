import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "./apollo/queries";

export const Client: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);

  if (error) return <p>{error.message}</p>;
  if (loading) return <p>Loading...</p>;
  if (data)
    return (
      <ul>
        {data.clients.map((client) => (
          <li key={client.id}>
            <h2>{client.cli_id}</h2>
            <p>{`${client.cli_name} from ${client.cli_city}`}</p>
          </li>
        ))}
      </ul>
    );
  return null;
};
