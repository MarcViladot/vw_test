import { ColumnDefs, RowValues } from '../types';
import React, { useMemo } from 'react';
import { EditableRow } from './EditableRow';

interface Props<T> {
  newRow: T;
  columnDefs: Array<ColumnDefs<T>>;
  onRowAdded: (values: Partial<T>) => void;
  onCancel: () => void;
}

export const NewRow = <T,>({ columnDefs, newRow, onRowAdded, onCancel }: Props<T>) => {
  const rowValues: Array<RowValues<T>> = useMemo(
    () => columnDefs.map(({ field, type }) => ({ value: newRow[field], field, type })),
    [newRow, columnDefs]
  );

  return (
    <EditableRow
      onCancel={onCancel}
      onSubmit={onRowAdded}
      initialValues={newRow}
      rowValues={rowValues}
      editing={true}
    />
  );
};
