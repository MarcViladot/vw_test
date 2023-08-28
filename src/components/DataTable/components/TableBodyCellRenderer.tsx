import React, { FC, ReactNode } from 'react';
import { TableBodyCell } from './TableBodyCell';

interface Props {
  value: unknown;
  cellRenderer?: (value: unknown) => ReactNode;
}

export const TableBodyCellRenderer: FC<Props> = ({ value, cellRenderer }) => {
  const cellValue = cellRenderer ? cellRenderer(value) : String(value);

  return <TableBodyCell>{cellValue}</TableBodyCell>;
};
