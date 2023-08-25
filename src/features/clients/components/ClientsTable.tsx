import React, { FC } from 'react';
import { Client } from '../types';
import { DataTable, TableOptions } from '@/components/DataTable';

interface Props {
  clients: Client[] | undefined;
}

export const ClientsTable: FC<Props> = ({ clients }) => {
  const tableOptions: TableOptions<Client> = {
    data: clients ?? [],
    columnDefs: [
      { headerName: 'Name', field: 'name', type: 'text' },
      { headerName: 'Age', field: 'age', type: 'text' },
    ],
  };

  return <DataTable options={tableOptions}></DataTable>;
};
