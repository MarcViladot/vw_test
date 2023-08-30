import React, { ReactNode } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa6';
import { TableBodyCell } from '@/components/DataTable/components/TableBodyCell';
import { useDataTableContext } from '@/components/DataTable/context/DataTableContext';

interface Props<T> {
  data: T;
  hideContent?: boolean;
  children?: ReactNode;
}

export const ActionsCell = <T,>({ data, children, hideContent = false }: Props<T>) => {
  const { onRowDelete, onRowPreview } = useDataTableContext();

  return (
    <TableBodyCell>
      <span className={'flex gap-3 items-center'}>
        {children}
        {!hideContent && (
          <>
            {onRowDelete && (
              <FaTrash
                data-testid={'trash-icon'}
                className={'cursor-pointer'}
                onClick={() => {
                  onRowDelete?.(data);
                }}
              />
            )}
            {onRowPreview && (
              <FaEye
                data-testid={'eye-icon'}
                className={'cursor-pointer'}
                onClick={() => {
                  onRowPreview(data);
                }}
              />
            )}
          </>
        )}
      </span>
    </TableBodyCell>
  );
};
