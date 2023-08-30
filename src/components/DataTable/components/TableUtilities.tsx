import React, { FC, ReactElement } from 'react';
import { TableSearchBar } from './TableSearchBar';

interface Props {
  addRow?: ReactElement;
}

export const TableUtilities: FC<Props> = ({ addRow }) => (
  <div className={'flex justify-between items-center mb-4'}>
    <TableSearchBar />
    {addRow}
  </div>
);
