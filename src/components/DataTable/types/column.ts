type ColType = 'text' | 'number';

export interface ColumnDefs {
  headerName: string;
  field: string;
  type: ColType;
}
