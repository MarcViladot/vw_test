import React, { useMemo } from 'react';
import { useDataTableContext } from '../context/DataTableContext';
import { ColumnDefs, RowValues } from '../types';
import { TableBodyCell } from './TableBodyCell';
import { EditableRow } from './EditableRow';
import { NewRow } from '@/components/DataTable/components/NewRow';
import { FaTrash } from 'react-icons/fa6';

export const TableBody = <T,>() => {
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
      {data.length ? (
        data.map((row, i) => <TableRow<T> rowIndex={i} key={i} data={row} columnDefs={columnDefs} />)
      ) : (
        <h3>No data</h3>
      )}
    </>
  );
};

interface TableRowProps<T> {
  rowIndex: number;
  data: T;
  columnDefs: Array<ColumnDefs<T>>;
}

const TableRow = <T,>({ data, columnDefs, rowIndex }: TableRowProps<T>) => {
  const { onRowEdit, onRowDeleted } = useDataTableContext();

  const rowValues: Array<RowValues<T>> = useMemo(
    () => columnDefs.map((def) => ({ value: data[def.field], field: def.field, type: def.type })),
    [data, columnDefs]
  );

  const handleRowDelete = () => {
    onRowDeleted?.({ row: rowIndex, data });
  };

  if (onRowEdit) {
    return (
      <EditableRow<T>
        onSubmit={onRowEdit}
        onDelete={onRowDeleted ? handleRowDelete : undefined}
        initialValues={data}
        rowValues={rowValues}
      />
    );
  }

  return (
    <div className={'table-row'}>
      {rowValues.map(({ field, value }, i) => (
        <TableBodyCell key={i}>{String(value)}</TableBodyCell>
      ))}
      {onRowDeleted && (
        <TableBodyCell>
          <FaTrash data-testid={'trash-icon'} className={'cursor-pointer'} onClick={handleRowDelete} />
        </TableBodyCell>
      )}
    </div>
  );
};
