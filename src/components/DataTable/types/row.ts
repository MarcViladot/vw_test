import { ColumnDefs } from './column';

export interface RowValues<T = unknown> {
  value: unknown;
  field: keyof T;
  type: ColumnDefs['type'];
}
