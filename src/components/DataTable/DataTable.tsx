import React from 'react';
import { ColumnDefs } from './types';
import { DataTableProvider } from './context/DataTableContext';
import { TableHeader, TableBody, TableUtilities } from './components';

interface DataTableProps<T = unknown> {
  data: T[];
  columnDefs: ColumnDefs[];
  onRowEdit?: (values: T) => void;
  onRowAdded?: (values: Partial<T>) => void;
  onRowDeleted?: ({ row, data }: { row: number; data: T }) => void;
  newRowModel?: Partial<T>;
}

export const DataTable = <T,>({
  data,
  columnDefs,
  onRowEdit,
  newRowModel,
  onRowAdded,
  onRowDeleted,
}: DataTableProps<T>) => (
  <DataTableProvider
    data={data}
    columnDefs={columnDefs}
    onRowEdit={onRowEdit}
    onRowDeleted={onRowDeleted}
    onRowAdded={onRowAdded}
    newRowModel={newRowModel}>
    <div className={'flex flex-col flex-grow gap-4'}>
      <TableUtilities />
      <div className={'table table-fixed w-full'}>
        <TableHeader />
        <TableBody />
      </div>
    </div>
  </DataTableProvider>
);
