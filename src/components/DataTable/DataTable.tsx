import React, { useState } from 'react';
import { ColumnDefs } from './types';
import { DataTableProvider } from './context/DataTableContext';
import { TableHeader, TableBody, TableSearchBar, NewRow } from './components';

interface DataTableProps<T = unknown> {
  data: T[];
  columnDefs: ColumnDefs[];
  onRowEdit?: (values: T) => void;
  onRowAdded?: (values: Partial<T>) => void;
  newRowModel?: Partial<T>;
}

export const DataTable = <T,>({ data, columnDefs, onRowEdit, newRowModel, onRowAdded }: DataTableProps<T>) => {
  const [newRow, setNewRow] = useState<Partial<T>>();

  return (
    <DataTableProvider data={data} columnDefs={columnDefs} onRowEdit={onRowEdit}>
      <div className={'flex flex-col flex-grow gap-4'}>
        <div className={'flex justify-between items-center'}>
          <TableSearchBar />
          {newRowModel && !newRow && (
            <button
              className={'p-1 px-3 border border-gray-200 rounded-lg bg-blue-200'}
              onClick={() => {
                setNewRow(newRowModel);
              }}>
              + Add row
            </button>
          )}
        </div>

        <div className={'table table-fixed w-full'}>
          <TableHeader />
          {newRow && onRowAdded && (
            <NewRow<T>
              columnDefs={columnDefs}
              onCancel={() => {
                setNewRow(undefined);
              }}
              newRow={newRow}
              onRowAdded={(values) => {
                onRowAdded(values);
                setNewRow(undefined);
              }}
            />
          )}
          <TableBody />
        </div>
      </div>
    </DataTableProvider>
  );
};
