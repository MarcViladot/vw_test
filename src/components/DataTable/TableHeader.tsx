import React, { FC } from 'react';
import { ColumnDefs } from '@/components/DataTable/types';
import { useDataTableContext } from '@/components/DataTable/context/DataTableContext';

export const TableHeader = () => {
  const { columnDefs } = useDataTableContext();
  return (
    <div className={'table-row'}>
      {columnDefs.map((def) => (
        <HeaderCell {...def} key={def.field} />
      ))}
    </div>
  );
};

const HeaderCell: FC<ColumnDefs> = ({ headerName }) => {
  return (
    <div className={'table-cell cursor-pointer'} onClick={() => null}>
      {headerName}
    </div>
  );
};
