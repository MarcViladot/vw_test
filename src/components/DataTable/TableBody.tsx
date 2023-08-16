import React, { FC, useMemo } from 'react';
import { useDataTableContext } from '@/components/DataTable/context/DataTableContext';
import { ColumnDefs } from './types';

export const TableBody = () => {
  const { data, columnDefs } = useDataTableContext();

  if (!data.length) return <h1>Empty table</h1>;
  return (
    <>
      {data.map((row, i) => (
        <TableRow key={i} data={row} columnDefs={columnDefs} />
      ))}
    </>
  );
};

interface TableRowProps {
  data: unknown;
  columnDefs: ColumnDefs[];
}

const TableRow: FC<TableRowProps> = ({ data, columnDefs }) => {
  const rowValues = useMemo(() => columnDefs.map((def) => data[def.field]), [data, columnDefs]);

  return (
    <div className={'table-row'}>
      {rowValues.map((value, i) => (
        <Cell key={i} value={value} />
      ))}
    </div>
  );
};

interface CellProps {
  value: unknown;
}

const Cell: FC<CellProps> = ({ value }) => {
  return <div className={'table-cell border border-black p-1'}>{value}</div>;
};
