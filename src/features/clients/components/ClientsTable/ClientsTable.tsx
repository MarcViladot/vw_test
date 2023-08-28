import React, { FC } from 'react';
import { DataTable } from '@/components/DataTable';
import { Client } from '../../types';
import { useClientsTable } from './useClientsTable';
import { FaPlus } from 'react-icons/fa6';

interface Props {
  clients: Client[] | undefined;
  onClientSelected: (client: Client) => void;
}

export const ClientsTable: FC<Props> = ({ clients, onClientSelected }) => {
  const tableOptions = useClientsTable(clients, onClientSelected);

  return (
    <DataTable
      options={tableOptions}
      addRow={({ setNewRow }) => (
        <button
          onClick={() => {
            setNewRow({
              name: '',
              lastName: '',
              born: new Date(),
              partners: 0,
              active: false,
              image: 'https://placehold.co/200x200',
            });
          }}
          className={'rounded-full p-2 bg-gray-200 hover:opacity-60'}>
          <FaPlus />
        </button>
      )}
    />
  );
};
