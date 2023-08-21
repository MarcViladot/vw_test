import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const TableBodyCell: FC<Props> = ({ children }) => {
  return <div className={'table-cell border-b py-3.5 px-2'}>{children}</div>;
};

interface TableBodyCellRendererProps {
  value: unknown;
  cellRenderer?: (value: unknown) => ReactNode;
}

export const TableBodyCellRenderer: FC<TableBodyCellRendererProps> = ({ value, cellRenderer }) => {
  const cellValue = cellRenderer ? cellRenderer(value) : String(value);

  return <TableBodyCell>{cellValue}</TableBodyCell>;
};
