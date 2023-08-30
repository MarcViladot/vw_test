import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import { TableBodyCell } from './TableBodyCell';
import { TableBodyCellRenderer } from './TableBodyCellRenderer';
import { MdOutlineEdit } from 'react-icons/md';
import { GiCancel, GiConfirmed } from 'react-icons/gi';
import { ColType, ColumnDefs, RowValues } from '../types';
import ReactDatePicker from 'react-datepicker';
import { CustomInput } from './CustomInput';
import { ActionsCell } from '@/components/DataTable/components/ActionsCell';

interface Props<T = unknown> {
  onSubmit: (values: T, hideEdition: () => void) => void;
  rowIndex: number;
  initialValues: T;
  rowValues: Array<RowValues<T>>;
  editing?: boolean;
  onCancel?: () => void;
}

export const EditableRow = <T,>({ onSubmit, rowIndex, rowValues, initialValues, editing, onCancel }: Props<T>) => {
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
        <tr>
          {rowValues.map(({ field, value, type, cellRenderer, editOptions }, i) =>
            isEditing ? (
              <TableBodyCell key={i}>
                <EditableInput
                  colType={type}
                  // @ts-expect-error
                  value={formik.values[field]}
                  editOptions={editOptions}
                  onChange={(value) => {
                    formik.setFieldValue(field as string, value);
                  }}
                />
              </TableBodyCell>
            ) : (
              <TableBodyCellRenderer value={value} key={i} cellRenderer={cellRenderer} />
            )
          )}
          <ActionsCell hideContent={isEditing} data={initialValues} rowIndex={rowIndex}>
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
                    onCancel?.();
                  }}
                />
              </>
            )}
          </ActionsCell>
        </tr>
      )}
    </Formik>
  );
};

interface EditableInputProps {
  value: unknown;
  onChange: (value: unknown) => void;
  colType: ColType;
  editOptions: ColumnDefs['editOptions'];
}

const EditableInput: FC<EditableInputProps> = ({ colType, value, onChange, editOptions }) => {
  if (editOptions) {
    return <CustomInput editOptions={editOptions} onChange={onChange} value={value} />;
  }

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
