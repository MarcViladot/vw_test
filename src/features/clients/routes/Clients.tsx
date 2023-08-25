import React from 'react';
import { useQuery } from 'react-query';
import { ClientsTable } from '../components/ClientsTable';
import { getClientsList } from '../api/getClientsList';

export const Clients = () => {
  const { data: clients } = useQuery(['clients'], getClientsList);

  return (
    <div>
      <h1 className={'mb-5 font-bold text-2xl'}>Clients</h1>
      <ClientsTable clients={clients} />
    </div>
  );
};
