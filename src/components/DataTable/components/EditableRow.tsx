import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import { TableBodyCell, TableBodyCellRenderer } from '@/components/DataTable/components/TableBodyCell';
import { MdOutlineEdit } from 'react-icons/md';
import { GiCancel, GiConfirmed } from 'react-icons/gi';
import { ColType, RowValues } from '../types';
import { FaEye, FaTrash } from 'react-icons/fa6';
import ReactDatePicker from 'react-datepicker';

interface Props<T = unknown> {
  onSubmit: (values: T, onSuccess: () => void) => void;
  onCancel?: () => void;
  onDelete?: () => void;
  onRowPreview?: (values: T) => void;
  initialValues: T;
  rowValues: Array<RowValues<T>>;
  editing?: boolean;
}

export const EditableRow = <T,>({
  onSubmit,
  rowValues,
  initialValues,
  editing,
  onCancel,
  onDelete,
  onRowPreview,
}: Props<T>) => {
  const [isEditing, setIsEditing] = useState(editing ?? false);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues as object}
      onSubmit={(values) => {
        onSubmit(values as T, () => {
          setIsEditing(false);
        });
      }}>
      {(formik) => (
        <div className={'table-row'}>
          {rowValues.map(({ field, value, type, cellRenderer }, i) =>
            isEditing ? (
              <TableBodyCell key={i}>
                <EditableInput
                  colType={type}
                  // @ts-expect-error
                  value={formik.values[field]}
                  onChange={(value) => {
                    formik.setFieldValue(field as string, value);
                  }}
                />
              </TableBodyCell>
            ) : (
              <TableBodyCellRenderer value={value} key={i} cellRenderer={cellRenderer} />
            )
          )}
          <TableBodyCell>
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
                  {onRowPreview && (
                    <FaEye
                      data-testid={'trash-icon'}
                      className={'cursor-pointer'}
                      onClick={() => {
                        onRowPreview(initialValues);
                      }}
                    />
                  )}
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
          </TableBodyCell>
        </div>
      )}
    </Formik>
  );
};

interface EditableInputProps {
  value: unknown;
  onChange: (value: unknown) => void;
  colType: ColType;
}

const EditableInput: FC<EditableInputProps> = ({ colType, value, onChange }) => {
  switch (colType) {
    case 'text':
    case 'number':
      return (
        <input
          type={colType}
          className={'border border-gray-200 py-1 px-2'}
          value={value as string}
          onChange={(e) => {
            const value = colType === 'number' ? Number(e.currentTarget.value) : e.currentTarget.value;
            onChange(value);
          }}
        />
      );
    case 'date':
      return (
        <ReactDatePicker
          selected={value as Date}
          onChange={(date: Date) => {
            onChange(date);
          }}
        />
      );
  }
};
