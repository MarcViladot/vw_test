import { createContext, FC, ReactElement, useCallback, useContext, useMemo, useState } from 'react';
import { ColumnDefs } from '@/components/DataTable';

export interface SortingState {
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
  newRow: unknown | undefined;
  addNewRow: () => void;
  onRowEdit?: (values: unknown) => void;
  onRowAdded?: (values: unknown) => void;
  cancelNewRow: () => void;
}

export const DataTableContext = createContext<ContextValue>({
  data: [],
  columnDefs: [],
  sorting: null,
  toggleSort: () => null,
  searchText: '',
  handleSearchText: () => null,
  addNewRow: () => null,
  newRow: undefined,
  cancelNewRow: () => null,
});

interface ProviderProps<T = unknown> {
  data: T[];
  columnDefs: ColumnDefs[];
  onRowEdit?: (values: T) => void;
  children: ReactElement;
  newRowModel?: Partial<T>;
  onRowAdded?: (values: Partial<T>) => void;
}

export const DataTableProvider: FC<ProviderProps> = ({
  children,
  data,
  columnDefs,
  onRowEdit,
  newRowModel,
  onRowAdded,
}) => {
  const [sorting, setSorting] = useState<SortingState | null>(null);
  const [searchText, setSearchText] = useState('');

  const [newRow, setNewRow] = useState<Partial<unknown>>();

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

  const addNewRow = useCallback(() => {
    setNewRow(newRowModel);
  }, [newRowModel]);

  const cancelNewRow = useCallback(() => {
    setNewRow(undefined);
  }, []);

  return (
    <DataTableContext.Provider
      value={{
        data: filteredData,
        columnDefs,
        sorting,
        toggleSort,
        handleSearchText: setSearchText,
        searchText,
        onRowEdit,
        addNewRow,
        newRow,
        onRowAdded,
        cancelNewRow,
      }}>
      {children}
    </DataTableContext.Provider>
  );
};

export const useDataTableContext = () => useContext(DataTableContext);
