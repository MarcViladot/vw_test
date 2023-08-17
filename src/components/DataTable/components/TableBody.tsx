import React, { FC, useMemo } from 'react';
import { useDataTableContext } from '../context/DataTableContext';
import { ColumnDefs, RowValues } from '../types';
import { TableBodyCell } from './TableBodyCell';
import { EditableRow } from './EditableRow';

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
  const { onRowEdit } = useDataTableContext();

  const rowValues: RowValues[] = useMemo(
    () => columnDefs.map((def) => ({ value: data[def.field], field: def.field, type: def.type })),
    [data, columnDefs]
  );

  if (onRowEdit) {
    return <EditableRow onSubmit={onRowEdit} initialValues={{ ...(data as object) }} rowValues={rowValues} />;
  }

  return (
    <div className={'table-row'}>
      {rowValues.map(({ field, value }, i) => (
        <TableBodyCell key={i}>{value}</TableBodyCell>
      ))}
    </div>
  );
};
