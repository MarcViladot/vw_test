export type ColType = 'text' | 'number' | 'date';

export interface ColumnDefs<T = unknown> {
  headerName: string;
  field: keyof T;
  type: ColType;
}
