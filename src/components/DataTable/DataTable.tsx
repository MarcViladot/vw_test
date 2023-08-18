import React, { useMemo, useState } from 'react';
import { ColumnDefs, RowValues } from './types';
import { DataTableProvider, useDataTableContext } from './context/DataTableContext';
import { TableHeader, TableBody, TableSearchBar, EditableRow } from './components';

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
            <AddRow<T>
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

interface AddRowProps<T> {
  newRow: Partial<T>;
  onRowAdded: (values: Partial<T>) => void;
  onCancel: () => void;
}

export const AddRow = <T,>({ newRow, onRowAdded, onCancel }: AddRowProps<T>) => {
  const { columnDefs } = useDataTableContext();

  const rowValues: RowValues[] = useMemo(
    () => columnDefs.map((def) => ({ value: newRow[def.field as keyof T], field: def.field, type: def.type })),
    [newRow, columnDefs]
  );

  const handleSubmit = (values: T) => {
    onRowAdded(values);
  };

  return (
    <EditableRow
      onCancel={onCancel}
      onSubmit={handleSubmit}
      initialValues={newRow}
      rowValues={rowValues}
      editing={true}
    />
  );
};
