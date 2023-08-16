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
  searchText: string;
  handleSearchText: (text: string) => void;
}

export const DataTableContext = createContext<ContextValue>({
  data: [],
  columnDefs: [],
  sorting: null,
  toggleSort: () => null,
  searchText: '',
  handleSearchText: () => null,
});

interface ProviderProps<T = unknown> {
  data: T[];
  columnDefs: ColumnDefs[];
  children: ReactElement;
}

export const DataTableProvider: FC<ProviderProps> = ({ children, data, columnDefs }) => {
  const [sorting, setSorting] = useState<SortingState | null>(null);
  const [searchText, setSearchText] = useState('');

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

  const filteredData = useMemo(() => {
    if (!searchText) return sortedData;
    return sortedData.filter((item) => {
      const concatenatedValues = Object.values(item)
        .map((value) => value.toString())
        .join('')
        .toLowerCase();

      return concatenatedValues.includes(searchText.toLowerCase());
    });
  }, [searchText, sortedData]);

  return (
    <DataTableContext.Provider
      value={{ data: filteredData, columnDefs, sorting, toggleSort, handleSearchText: setSearchText, searchText }}>
      {children}
    </DataTableContext.Provider>
  );
};

export const useDataTableContext = () => useContext(DataTableContext);
