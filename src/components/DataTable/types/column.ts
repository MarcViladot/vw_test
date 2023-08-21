import { ReactNode } from 'react';

export type ColType = 'text' | 'number' | 'date';

export interface ColumnDefs<T = unknown> {
  headerName: string;
  field: keyof T;
  type: ColType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellRenderer?: (value: any) => ReactNode;
}
