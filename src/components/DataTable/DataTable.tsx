import React, { useState } from 'react';
import { ColumnDefs } from './types';
import { useTableStore, TableStoreState } from './store';

interface DataTableProps<T = unknown> {
  data: T[];
  columnDefs: ColumnDefs[];
}

export const DataTable = <T,>({ data, columnDefs }: DataTableProps<T>) => {
  const setData = useTableStore((state: TableStoreState) => state.setData);

  const [prevData, setPrevData] = useState(data);
  if (prevData !== data) {
    setPrevData(data);
    setData(data, columnDefs);
  }

  return <div></div>;
};
