import { useMutation, useQueryClient } from 'react-query';
import { TableOptions } from '@/components/DataTable';
import { Client } from '../../types';
import { updateClient, createClient, deleteClient } from '../../api';

export const useClientsTable = (clients: Client[] | undefined, onClientSelected: (client: Client) => void) => {
  const queryClient = useQueryClient();

  const updateClientMutation = useMutation<Client, void, { id: number; data: Client }>({
    mutationFn: async ({ id, data }: { id: number; data: Client }) => {
      return await updateClient(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('clients'); // Invalidate and refetch the 'clients' query
    },
  });

  const createClientMutation = useMutation<Client, void, Partial<Client>>({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries('clients'); // Invalidate and refetch the 'clients' query
    },
  });

  const deleteClientMutation = useMutation<Client, void, number>({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries('clients');
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
    onRowDelete: ({ data }) => {
      deleteClientMutation.mutate(data.id);
    },
    onRowAdded: (data) => {
      createClientMutation.mutate(data);
    },
    newRowModel: {
      name: '',
      age: 0,
      image: 'https://placehold.co/200x200',
    },
    onRowPreview: onClientSelected,
  };
  return tableOptions;
};
