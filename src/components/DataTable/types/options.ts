import { ColumnDefs } from '@/components/DataTable';

export interface TableOptions<T = unknown> {
  data: T[];
  columnDefs: Array<ColumnDefs<T>>;
  onRowEdit?: (values: T) => void;
  onRowAdded?: (values: Partial<T>) => void;
  onRowDeleted?: ({ row, data }: { row: number; data: T }) => void;
  newRowModel?: Partial<T>;
}
