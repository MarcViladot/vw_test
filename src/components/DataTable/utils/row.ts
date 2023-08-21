import { ColumnDefs } from '@/components/DataTable';

export const getRowValues = <T>(data: T, columnDefs: Array<ColumnDefs<T>>) => {
  return columnDefs.map(({ field, type, cellRenderer }) => ({ value: data[field], field, type, cellRenderer }));
};
