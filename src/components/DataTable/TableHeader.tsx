import React, { FC, useMemo } from 'react';
import { ColumnDefs } from '@/components/DataTable/types';
import { useDataTableContext } from '@/components/DataTable/context/DataTableContext';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';

export const TableHeader = () => {
  const { columnDefs } = useDataTableContext();
  return (
    <>
      <div className={'table-row'}>
        {columnDefs.map((def) => (
          <HeaderCell {...def} key={def.field} />
        ))}
      </div>
    </>
  );
};

const HeaderCell: FC<ColumnDefs> = ({ headerName, field }) => {
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
              <FaArrowDownLong data-testid={'arrow-up'} />
            ) : (
              <FaArrowUpLong data-testid={'arrow-down'} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
