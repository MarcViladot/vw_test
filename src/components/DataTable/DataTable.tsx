import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { DataTableProvider } from './context/DataTableContext';
import { TableHeader, TableBody, TableUtilities } from './components';
import { TableOptions } from './types';

interface DataTableProps<T = unknown> {
  options: TableOptions<T>;
  addRow?: (props: { setNewRow: Dispatch<SetStateAction<Partial<T> | undefined>> }) => ReactElement;
}

export const DataTable = <T,>({ options, addRow }: DataTableProps<T>) => {
  const [newRow, setNewRow] = useState<Partial<T>>();

  return (
    <DataTableProvider {...options}>
      <div className={'w-full h-full overflow-y-auto'}>
        <TableUtilities addRow={addRow?.({ setNewRow })} />
        <table className={'w-full table-fixed'}>
          <TableHeader />
          <TableBody
            newRow={newRow}
            cancelNewRow={() => {
              setNewRow(undefined);
            }}
          />
        </table>
      </div>
    </DataTableProvider>
  );
};
