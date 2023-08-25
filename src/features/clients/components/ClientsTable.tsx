import React, { FC } from 'react';
import { Client } from '../types';
import { DataTable, TableOptions } from '@/components/DataTable';
import { useMutation, useQueryClient } from 'react-query';
import { updateClient } from '@/features/clients/api/updateClient';

interface Props {
  clients: Client[] | undefined;
  onClientSelected: (client: Client) => void;
}

export const ClientsTable: FC<Props> = ({ clients, onClientSelected }) => {
  const queryClient = useQueryClient();

  const updateClientMutation = useMutation<Client, void, { id: number; data: Client }>({
    mutationFn: async ({ id, data }: { id: number; data: Client }) => {
      return await updateClient(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('clients'); // Invalidate and refetch the 'clients' query
    },
  });

  const tableOptions: TableOptions<Client> = {
    data: clients ?? [],
    columnDefs: [
      { headerName: 'Name', field: 'name', type: 'text' },
      { headerName: 'Age', field: 'age', type: 'number' },
    ],
    onRowEdit: (data: Client) => {
      updateClientMutation.mutate({ id: data.id, data });
    },
    onRowPreview: onClientSelected,
  };

  return <DataTable options={tableOptions} />;
};
