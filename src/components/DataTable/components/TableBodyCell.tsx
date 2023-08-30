import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const TableBodyCell: FC<Props> = ({ children, className }) => {
  return <td className={`border-b py-3.5 px-2 align-middle ${className ?? ''}`}>{children}</td>;
};
