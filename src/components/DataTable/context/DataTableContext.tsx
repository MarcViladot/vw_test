import { createContext, FC, ReactElement, useContext } from 'react';
import { ColumnDefs } from '@/components/DataTable';

interface ContextValue {
  data: unknown[];
  columnDefs: ColumnDefs[];
}

const DataTableContext = createContext<ContextValue>({
  data: [],
  columnDefs: [],
});

interface ProviderProps {
  data: unknown[];
  columnDefs: ColumnDefs[];
  children: ReactElement;
}

export const DataTableProvider: FC<ProviderProps> = ({ children, data, columnDefs }) => {
  return <DataTableContext.Provider value={{ data, columnDefs }}>{children}</DataTableContext.Provider>;
};

export const useDataTableContext = () => useContext(DataTableContext);
