import React, { FC, ReactNode } from 'react';
import { TableBodyCell } from './TableBodyCell';

interface Props {
  value: unknown;
  cellRenderer?: (value: unknown) => ReactNode;
}

export const TableBodyCellRenderer: FC<Props> = ({ value, cellRenderer }) => (
  <TableBodyCell>{cellRenderer ? cellRenderer(value) : String(value)}</TableBodyCell>
);
