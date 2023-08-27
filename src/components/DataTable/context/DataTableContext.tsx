import { createContext, ReactElement, useCallback, useContext, useMemo, useState } from 'react';
import { TableOptions } from '../types';
import { getFilterData, getNewSortingState, getSortedData } from './helper';

export interface SortingState<T> {
  field: keyof T;
  direction: 'asc' | 'desc';
}

interface ContextValue<T> extends Omit<TableOptions<T>, 'newRowModel'> {
  sorting: null | SortingState<T>;
  toggleSort: (field: keyof T) => void;
  searchText: string;
  handleSearchText: (text: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataTableContext = createContext<ContextValue<any>>({
  data: [],
  columnDefs: [],
  sorting: null,
  toggleSort: () => null,
  searchText: '',
  handleSearchText: () => null,
});

interface ProviderProps<T> extends TableOptions<T> {
  children: ReactElement;
}

export const DataTableProvider = <T,>({ children, data, ...rest }: ProviderProps<T>) => {
  const [sorting, setSorting] = useState<SortingState<T> | null>(null);
  const [searchText, setSearchText] = useState('');

  const toggleSort = useCallback((field: keyof T) => {
    setSorting(getNewSortingState(field));
  }, []);

  const sortedData = useMemo(() => getSortedData(data, sorting), [data, sorting]);
  const filteredData = useMemo(() => getFilterData(sortedData, searchText), [searchText, sortedData]);

  const contextValue: ContextValue<T> = {
    data: filteredData,
    toggleSort,
    sorting,
    handleSearchText: setSearchText,
    searchText,
    ...rest,
  };

  return <DataTableContext.Provider value={contextValue}>{children}</DataTableContext.Provider>;
};

export const useDataTableContext = () => useContext(DataTableContext);
