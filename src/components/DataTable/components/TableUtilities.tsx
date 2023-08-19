import React from 'react';
import { TableSearchBar } from './TableSearchBar';
import { useDataTableContext } from '@/components/DataTable/context/DataTableContext';

export const TableUtilities = () => {
  const { newRow, addNewRow, onRowAdded } = useDataTableContext();

  return (
    <div className={'flex justify-between items-center'}>
      <TableSearchBar />
      {onRowAdded && !newRow && (
        <button className={'p-1 px-3 border border-gray-200 rounded-lg bg-blue-200'} onClick={addNewRow}>
          + Add row
        </button>
      )}
    </div>
  );
};
