import { ColumnDefs, RowValues } from '../types';
import React, { useMemo } from 'react';
import { EditableRow } from './EditableRow';
import { getRowValues } from '@/components/DataTable/utils/row';

interface Props<T> {
  newRow: T;
  columnDefs: Array<ColumnDefs<T>>;
  onRowAdded: (values: Partial<T>) => void;
  onCancel: () => void;
}

export const NewRow = <T,>({ columnDefs, newRow, onRowAdded, ...rest }: Props<T>) => {
  const rowValues: Array<RowValues<T>> = useMemo(() => getRowValues(newRow, columnDefs), [newRow, columnDefs]);

  return <EditableRow onSubmit={onRowAdded} initialValues={newRow} rowValues={rowValues} editing={true} {...rest} />;
};
