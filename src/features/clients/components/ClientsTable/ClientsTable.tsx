import React, { FC } from 'react';
import { DataTable } from '@/components/DataTable';
import { Client } from '../../types';
import { useClientsTable } from './useClientsTable';

interface Props {
  clients: Client[] | undefined;
  onClientSelected: (client: Client) => void;
}

export const ClientsTable: FC<Props> = ({ clients, onClientSelected }) => {
  const tableOptions = useClientsTable(clients, onClientSelected);

  return <DataTable options={tableOptions} />;
};
