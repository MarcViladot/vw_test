import { ReactNode } from 'react';

export type ColType = 'text' | 'number' | 'date';

export interface ColumnDefs<T = unknown> {
  headerName: string;
  field: keyof T;
  type: ColType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellRenderer?: (value: any) => ReactNode;
  editOptions?: EditOptions<EditOptionsType>;
}

export enum EditOptionsType {
  'Select' = 'Select',
}

interface SelectInput {
  type: EditOptionsType.Select;
  options: Array<{ value: string; label: string }>;
  parseValue?: (value: string) => unknown;
}

interface EditOptionsMap {
  [EditOptionsType.Select]: SelectInput;
}

export type EditOptions<T extends EditOptionsType> = T extends keyof EditOptionsMap ? EditOptionsMap[T] : never;
