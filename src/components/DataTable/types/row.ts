import { ColumnDefs } from './column';

export interface RowValues<T = unknown> extends Omit<ColumnDefs<T>, 'headerName'> {
  value: unknown;
}
