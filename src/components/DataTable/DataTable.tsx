import React from 'react';
import { ColumnDefs } from './types';
import { DataTableProvider } from '@/components/DataTable/context/DataTableContext';
import { TableHeader } from '@/components/DataTable/TableHeader';
import { TableBody } from '@/components/DataTable/TableBody';
import { TableSearchBar } from '@/components/DataTable/TableSearchBar';

interface DataTableProps<T = unknown> {
  data: T[];
  columnDefs: ColumnDefs[];
}

export const DataTable = <T,>({ data, columnDefs }: DataTableProps<T>) => {
  return (
    <DataTableProvider data={data} columnDefs={columnDefs}>
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
