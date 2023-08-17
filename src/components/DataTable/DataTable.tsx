import React from 'react';
import { ColumnDefs } from './types';
import { DataTableProvider } from '@/components/DataTable/context/DataTableContext';
import { TableHeader } from '@/components/DataTable/TableHeader';
import { TableBody } from '@/components/DataTable/TableBody';
import { TableSearchBar } from '@/components/DataTable/TableSearchBar';

interface DataTableProps<T = unknown> {
  data: T[];
  columnDefs: ColumnDefs[];
  onRowEdit?: (values: T) => void;
}

export const DataTable = <T,>({ data, columnDefs, onRowEdit }: DataTableProps<T>) => {
  return (
    <DataTableProvider data={data} columnDefs={columnDefs} onRowEdit={onRowEdit}>
      <div className={'flex flex-col flex-grow gap-4'}>
        <TableSearchBar />
        <div className={'table table-fixed w-full'}>
          <TableHeader />
          <TableBody />
        </div>
      </div>
    </DataTableProvider>
  );
};
