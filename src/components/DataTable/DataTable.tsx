import React from 'react';
import { DataTableProvider } from './context/DataTableContext';
import { TableHeader, TableBody, TableUtilities } from './components';
import { TableOptions } from './types';

interface DataTableProps<T = unknown> {
  options: TableOptions<T>;
}

export const DataTable = <T,>({ options }: DataTableProps<T>) => (
  <DataTableProvider {...options}>
    <div className={'flex flex-col flex-grow gap-4'}>
      <TableUtilities />
      <div className={'table table-fixed w-full'}>
        <TableHeader />
        <TableBody />
      </div>
    </div>
  </DataTableProvider>
);
