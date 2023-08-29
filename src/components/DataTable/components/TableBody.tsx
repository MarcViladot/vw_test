import React, { useMemo } from 'react';
import { useDataTableContext } from '../context/DataTableContext';
import { ColumnDefs, RowValues } from '../types';
import { TableBodyCell } from './TableBodyCell';
import { EditableRow } from './EditableRow';
import { NewRow } from './NewRow';
import { FaEye, FaTrash } from 'react-icons/fa6';
import { getRowValues } from '../utils/row';
import { TableBodyCellRenderer } from './TableBodyCellRenderer';

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
        <td colSpan={columnDefs.length + 1}>
          <h3 className={'text-center my-10'}>No data</h3>
        </td>
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
  const { onRowEdit, onRowDelete, onRowPreview } = useDataTableContext();

  const rowValues: Array<RowValues<T>> = useMemo(() => getRowValues(data, columnDefs), [data, columnDefs]);

  const handleRowDelete = () => {
    onRowDelete?.({ row: rowIndex, data });
  };

  if (onRowEdit) {
    return (
      <EditableRow<T>
        onSubmit={onRowEdit}
        onDelete={onRowDelete ? handleRowDelete : undefined}
        initialValues={data}
        rowValues={rowValues}
        onRowPreview={onRowPreview}
      />
    );
  }

  return (
    <tr>
      {rowValues.map(({ field, value, cellRenderer }, i) => (
        <TableBodyCellRenderer key={i} value={value} cellRenderer={cellRenderer} />
      ))}
      <TableBodyCell>
        <div className={'flex gap-3 items-center'}>
          {onRowDelete && <FaTrash data-testid={'trash-icon'} className={'cursor-pointer'} onClick={handleRowDelete} />}
          {onRowPreview && (
            <FaEye
              data-testid={'trash-icon'}
              className={'cursor-pointer'}
              onClick={() => {
                onRowPreview(data);
              }}
            />
          )}
        </div>
      </TableBodyCell>
    </tr>
  );
};
