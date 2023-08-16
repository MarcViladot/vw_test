import { createContext, FC, ReactElement, useContext, useMemo, useState } from 'react';
import { ColumnDefs } from '@/components/DataTable';

interface SortingState {
  field: string;
  direction: 'asc' | 'desc';
}

interface ContextValue {
  data: unknown[];
  columnDefs: ColumnDefs[];
  sorting: null | SortingState;
  toggleSort: (field: string) => void;
}

const DataTableContext = createContext<ContextValue>({
  data: [],
  columnDefs: [],
  sorting: null,
  toggleSort: () => null,
});

interface ProviderProps<T = unknown> {
  data: T[];
  columnDefs: ColumnDefs[];
  children: ReactElement;
}

export const DataTableProvider: FC<ProviderProps> = ({ children, data, columnDefs }) => {
  const [sorting, setSorting] = useState<SortingState | null>(null);

  const toggleSort = (field: string) => {
    setSorting((prevSorting) => {
      if (prevSorting?.field !== field) {
        return {
          field,
          direction: 'asc',
        };
      }
      if (prevSorting?.direction === 'desc') return null;
      return {
        ...prevSorting,
        direction: 'desc',
      };
    });
  };

  const sortedData = useMemo(() => {
    if (!sorting) return data;
    return [...data].sort((a, b) => {
      // @ts-expect-error
      const aValue = a[sorting.field];
      // @ts-expect-error
      const bValue = b[sorting.field];
      if (aValue < bValue) return sorting.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sorting.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sorting]);

  return (
    <DataTableContext.Provider value={{ data: sortedData, columnDefs, sorting, toggleSort }}>
      {children}
    </DataTableContext.Provider>
  );
};

export const useDataTableContext = () => useContext(DataTableContext);
