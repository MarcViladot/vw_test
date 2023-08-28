import { useMutation, useQueryClient } from 'react-query';
import { EditOptionsType, TableOptions } from '@/components/DataTable';
import { Client } from '../../types';
import { updateClient, createClient, deleteClient } from '../../api';
import { calculateAge } from '@/features/clients/utils/date';

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
      console.log('hola');
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
      { headerName: 'Last Name', field: 'lastName', type: 'text' },
      {
        headerName: 'Age',
        field: 'born',
        type: 'date',
        cellRenderer: (value: Date) => <div>{calculateAge(value)}</div>,
      },
      { headerName: 'Partners', field: 'partners', type: 'number' },
      {
        headerName: 'Active',
        field: 'active',
        type: 'text',
        editOptions: {
          type: EditOptionsType.Select,
          options: [
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' },
          ],
          parseValue: (value) => value === 'true',
        },
        cellRenderer: (value: boolean) => <div>{value ? 'Yes' : 'No'}</div>,
      },
    ],
    onRowEdit: (data: Client, hideEdition) => {
      updateClientMutation.mutateAsync({ id: data.id, data }).then(hideEdition);
    },
    onRowDelete: ({ data }) => {
      deleteClientMutation.mutate(data.id);
    },
    onRowAdded: (data, hideEdition) => {
      createClientMutation.mutateAsync(data).then(() => {
        hideEdition();
      });
    },
    onRowPreview: onClientSelected,
  };
  return tableOptions;
};
