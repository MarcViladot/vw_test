import { ColumnDefs, RowValues } from '@/components/DataTable';

export const getRowValues = <T>(data: T, columnDefs: Array<ColumnDefs<T>>): Array<RowValues<T>> => {
  return columnDefs.map(({ field, ...rest }) => ({ value: data[field], field, ...rest }));
};
