import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const TableBodyCell: FC<Props> = ({ children }) => {
  return <div className={'table-cell border-b py-3.5 px-2'}>{children}</div>;
};


