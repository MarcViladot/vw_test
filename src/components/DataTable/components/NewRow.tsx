import { ColumnDefs, RowValues } from '../types';
import React, { useMemo } from 'react';
import { EditableRow } from './EditableRow';

interface Props<T> {
  newRow: Partial<T>;
  columnDefs: ColumnDefs[];
  onRowAdded: (values: Partial<T>) => void;
  onCancel: () => void;
}

export const NewRow = <T,>({ columnDefs, newRow, onRowAdded, onCancel }: Props<T>) => {
  const rowValues: RowValues[] = useMemo(
    () => columnDefs.map((def) => ({ value: newRow[def.field as keyof T], field: def.field, type: def.type })),
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
