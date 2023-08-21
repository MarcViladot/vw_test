import { ColumnDefs } from './column';
import { ReactNode } from 'react';

export interface RowValues<T = unknown> {
  value: unknown;
  field: keyof T;
  type: ColumnDefs['type'];
  cellRenderer?: (value: unknown) => ReactNode;
}
