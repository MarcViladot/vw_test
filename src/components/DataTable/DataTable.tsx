import React from 'react';
import { ColumnDefs } from './types';
import { DataTableProvider } from '@/components/DataTable/context/DataTableContext';

interface DataTableProps<T = unknown> {
  data: T[];
  columnDefs: ColumnDefs[];
}

export const DataTable = <T,>({ data, columnDefs }: DataTableProps<T>) => {
  return (
    <DataTableProvider data={data} columnDefs={columnDefs}>
      <div />
    </DataTableProvider>
  );
};
