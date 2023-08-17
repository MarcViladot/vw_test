import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import { TableBodyCell } from '@/components/DataTable/components/TableBodyCell';
import { MdOutlineEdit } from 'react-icons/md';
import { GiCancel, GiConfirmed } from 'react-icons/gi';
import { RowValues } from '../types';

interface Props {
  onSubmit: (values: unknown) => void;
  initialValues: any;
  rowValues: RowValues[];
}

export const EditableRow: FC<Props> = ({ onSubmit, rowValues, initialValues }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values);
      }}>
      {(formik) => (
        <div className={'table-row'}>
          {rowValues.map(({ field, value, type }, i) => (
            <TableBodyCell key={i}>
              {isEditing ? (
                <input
                  type={type}
                  className={'border border-gray-200 py-1 px-2'}
                  value={formik.values[field].toString()}
                  onChange={(e) => {
                    formik.setFieldValue(field, e.currentTarget.value);
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
                <MdOutlineEdit
                  data-testid={'edit-icon'}
                  className={'cursor-pointer'}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                />
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
