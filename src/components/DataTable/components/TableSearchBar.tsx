import React from 'react';
import { useDataTableContext } from '@/components/DataTable/context/DataTableContext';

export const TableSearchBar = () => {
  const { searchText, handleSearchText } = useDataTableContext();

  return (
    <div>
      <input
        className={'p-2 bg-gray-100 rounded-lg border border-gray-300 w-96'}
        value={searchText}
        placeholder={'🔍 Search anything'}
        onChange={(e) => {
          handleSearchText(e.currentTarget.value);
        }}
      />
    </div>
  );
};
