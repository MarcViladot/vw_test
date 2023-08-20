import { ColumnDefs } from './column';

export interface RowValues {
  value: unknown;
  field: string;
  type: ColumnDefs['type'];
}
