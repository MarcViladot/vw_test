import React, { useMemo } from 'react';
import { useDataTableContext } from '../context/DataTableContext';
import { ColumnDefs, RowValues } from '../types';
import { EditableRow } from './EditableRow';
import { NewRow } from './NewRow';
import { getRowValues } from '../utils/row';
import { TableBodyCellRenderer } from './TableBodyCellRenderer';
import { ActionsCell } from './ActionsCell';

interface Props<T> {
  newRow: T | undefined;
  cancelNewRow: () => void;
}

export const TableBody = <T,>({ newRow, cancelNewRow }: Props<T>) => {
  const { data, columnDefs, onRowAdded } = useDataTableContext();

  return (
    <tbody>
      {newRow && (
        <NewRow
          columnDefs={columnDefs}
          onCancel={cancelNewRow}
          newRow={newRow}
          onRowAdded={(values) => {
            onRowAdded?.(values, cancelNewRow);
          }}
        />
      )}
      {data.length ? (
        data.map((row, i) => <TableRow<T> rowIndex={i} key={i} data={row} columnDefs={columnDefs} />)
      ) : (
        <tr>
          <td colSpan={columnDefs.length + 1}>
            <h3 className={'text-center my-10'}>No data</h3>
          </td>
        </tr>
      )}
    </tbody>
  );
};

interface TableRowProps<T> {
  rowIndex: number;
  data: T;
  columnDefs: Array<ColumnDefs<T>>;
}

const TableRow = <T,>({ data, columnDefs, rowIndex }: TableRowProps<T>) => {
  const { onRowEdit } = useDataTableContext();

  const rowValues: Array<RowValues<T>> = useMemo(() => getRowValues(data, columnDefs), [data, columnDefs]);

  if (onRowEdit) {
    return <EditableRow<T> onSubmit={onRowEdit} rowIndex={rowIndex} initialValues={data} rowValues={rowValues} />;
  }

  return (
    <tr>
      {rowValues.map(({ field, value, cellRenderer }, i) => (
        <TableBodyCellRenderer key={i} value={value} cellRenderer={cellRenderer} />
      ))}
      <ActionsCell data={data} rowIndex={rowIndex} />
    </tr>
  );
};
