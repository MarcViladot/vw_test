import React, { FC, ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

export const TableBodyCell: FC<Props> = ({ children }) => {
  return <div className={'table-cell border-b py-3.5 px-2'}>{children}</div>;
};
