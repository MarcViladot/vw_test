import React, { FC, PropsWithChildren } from 'react';

export const TableBodyCell: FC<PropsWithChildren> = ({ children }) => (
  <td className={`border-b py-3.5 px-2 align-middle`}>{children}</td>
);
