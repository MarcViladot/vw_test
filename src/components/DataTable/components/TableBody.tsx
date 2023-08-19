import React, { FC, useMemo } from 'react';
import { useDataTableContext } from '../context/DataTableContext';
import { ColumnDefs, RowValues } from '../types';
import { TableBodyCell } from './TableBodyCell';
import { EditableRow } from './EditableRow';
import { NewRow } from '@/components/DataTable/components/NewRow';

export const TableBody = () => {
  const { data, columnDefs, newRow, onRowAdded, cancelNewRow } = useDataTableContext();

  return (
    <>
      {newRow && onRowAdded && (
        <NewRow
          columnDefs={columnDefs}
          onCancel={cancelNewRow}
          newRow={newRow}
          onRowAdded={(values) => {
            onRowAdded(values);
            cancelNewRow();
          }}
        />
      )}
      {data.length ? data.map((row, i) => <TableRow key={i} data={row} columnDefs={columnDefs} />) : <h3>No data</h3>}
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
