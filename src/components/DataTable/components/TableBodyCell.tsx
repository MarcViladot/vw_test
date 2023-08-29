import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const TableBodyCell: FC<Props> = ({ children }) => {
  return <td className={'border-b py-3.5 px-2 align-middle'}>{children}</td>;
};
