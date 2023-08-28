import { ColumnDefs } from '@/components/DataTable';

export interface TableOptions<T = unknown> {
  data: T[];
  columnDefs: Array<ColumnDefs<T>>;
  onRowEdit?: (values: T, hideEdition: () => void) => void;
  onRowAdded?: (values: Partial<T>, hideEdition: () => void) => void;
  onRowDelete?: ({ row, data }: { row: number; data: T }) => void;
  onRowPreview?: (values: T) => void;
}
