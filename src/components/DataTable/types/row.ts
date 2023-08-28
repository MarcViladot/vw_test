import { ColumnDefs } from './column';

export interface RowValues<T = unknown> extends ColumnDefs<T> {
  value: unknown;
}
