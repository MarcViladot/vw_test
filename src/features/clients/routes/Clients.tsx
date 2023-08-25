import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ClientsTable } from '../components/ClientsTable';
import { getClientsList } from '../api/getClientsList';
import { Client } from '@/features/clients';
import { ClientDetail } from '@/features/clients/components/ClientDetail';

export const Clients = () => {
  const { data: clients } = useQuery(['clients'], getClientsList);

  const [selectedClient, setSelectedClient] = useState<Client>();

  return (
    <div className={'flex flex-col gap-8'}>
      <h1 className={'font-bold text-2xl'}>Clients</h1>
      <ClientsTable clients={clients} onClientSelected={setSelectedClient} />
      {selectedClient && <ClientDetail {...selectedClient} />}
    </div>
  );
};
