import { ColumnDefs } from '../types';
import { create } from 'zustand';

export interface TableStoreState {
  data: unknown[];
  columnDefs: ColumnDefs[];
  setData: (data: unknown[], columnDefs: ColumnDefs[]) => void;
}

export const useTableStore = create<TableStoreState>((set) => ({
  data: [],
  columnDefs: [],
  setData: (data, columnDefs) => {
    set(() => ({ data, columnDefs }));
  },
}));
