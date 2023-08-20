import React, { useState } from 'react';
import { Formik } from 'formik';
import { TableBodyCell } from '@/components/DataTable/components/TableBodyCell';
import { MdOutlineEdit } from 'react-icons/md';
import { GiCancel, GiConfirmed } from 'react-icons/gi';
import { RowValues } from '../types';
import { FaTrash } from 'react-icons/fa6';

interface Props<T = unknown> {
  onSubmit: (values: T) => void;
  onCancel?: () => void;
  onDelete?: () => void;
  initialValues: T;
  rowValues: Array<RowValues<T>>;
  editing?: boolean;
}

export const EditableRow = <T,>({ onSubmit, rowValues, initialValues, editing, onCancel, onDelete }: Props<T>) => {
  const [isEditing, setIsEditing] = useState(editing ?? false);

  return (
    <Formik
      initialValues={initialValues as object}
      onSubmit={(values) => {
        onSubmit(values as T);
      }}>
      {(formik) => (
        <div className={'table-row'}>
          {rowValues.map(({ field, value, type }, i) => (
            <TableBodyCell key={i}>
              {isEditing ? (
                <input
                  type={type}
                  className={'border border-gray-200 py-1 px-2'}
                  // @ts-expect-error
                  value={formik.values[field].toString()}
                  onChange={(e) => {
                    formik.setFieldValue(field as string, e.currentTarget.value);
                  }}
                />
              ) : (
                <>{value}</>
              )}
            </TableBodyCell>
          ))}
          <div className={'table-cell border-b py-3.5 px-2 cursor-pointer'}>
            <div className={'flex gap-3 items-center'}>
              {!isEditing ? (
                <>
                  <MdOutlineEdit
                    data-testid={'edit-icon'}
                    className={'cursor-pointer'}
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  />
                  {onDelete && <FaTrash data-testid={'trash-icon'} className={'cursor-pointer'} onClick={onDelete} />}
                </>
              ) : (
                <>
                  <GiConfirmed
                    data-testid={'submit-icon'}
                    className={'cursor-pointer'}
                    onClick={() => {
                      formik.submitForm();
                    }}
                  />
                  <GiCancel
                    data-testid={'cancel-icon'}
                    className={'cursor-pointer'}
                    onClick={() => {
                      setIsEditing(false);
                      formik.resetForm();
                      onCancel?.();
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
