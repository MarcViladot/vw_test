import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { DataTableProvider } from './context/DataTableContext';
import { TableHeader, TableBody, TableUtilities } from './components';
import { TableOptions } from './types';

interface DataTableProps<T = unknown> {
  options: TableOptions<T>;
  addRow?: (props: { setNewRow: Dispatch<SetStateAction<T | undefined>> }) => ReactElement;
}

export const DataTable = <T,>({ options, addRow }: DataTableProps<T>) => {
  const [newRow, setNewRow] = useState<T>();

  return (
    <DataTableProvider {...options}>
      <div className={'flex flex-col flex-grow gap-4'}>
        <TableUtilities addRow={addRow?.({ setNewRow })} />
        <div className={'table table-fixed w-full'}>
          <TableHeader />
          <TableBody
            newRow={newRow}
            cancelNewRow={() => {
              setNewRow(undefined);
            }}
          />
        </div>
      </div>
    </DataTableProvider>
  );
};
