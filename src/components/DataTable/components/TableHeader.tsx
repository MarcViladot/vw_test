import React, { useMemo } from 'react';
import { ColumnDefs } from '../types';
import { useDataTableContext } from '../context/DataTableContext';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';

export const TableHeader = <T,>() => {
  const { columnDefs } = useDataTableContext();
  return (
    <>
      <div className={'table-row'}>
        {columnDefs.map((def: ColumnDefs<T>, i) => (
          <HeaderCell<T> {...def} key={i} />
        ))}
        <div className={'table-cell cursor-pointer p-1 px-2 bg-[#F1F3FA]'}>
          <div className={'flex justify-between items-center text-sm font-bold text-[#ACB1C5]'}>Actions</div>
        </div>
      </div>
    </>
  );
};

const HeaderCell = <T,>({ headerName, field }: ColumnDefs<T>) => {
  const { toggleSort, sorting } = useDataTableContext();

  const sortDirection = useMemo(() => (sorting?.field === field ? sorting.direction : ''), [sorting, field]);

  return (
    <div
      className={'table-cell cursor-pointer p-1 px-2 bg-[#F1F3FA]'}
      data-testid={field}
      onClick={() => {
        toggleSort(field);
      }}>
      <div className={'flex justify-between items-center text-sm font-bold text-[#ACB1C5]'}>
        {headerName}
        {sortDirection && (
          <div data-testid={'sort-status'}>
            {sortDirection === 'asc' ? (
              <FaArrowUpLong data-testid={'arrow-up'} />
            ) : (
              <FaArrowDownLong data-testid={'arrow-down'} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
