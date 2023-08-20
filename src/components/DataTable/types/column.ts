type ColType = 'text' | 'number';

export interface ColumnDefs<T = unknown> {
  headerName: string;
  field: keyof T;
  type: ColType;
}
