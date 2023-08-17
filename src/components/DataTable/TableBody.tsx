import React, { FC, ReactElement, useMemo, useState } from 'react';
import { useDataTableContext } from '@/components/DataTable/context/DataTableContext';
import { ColumnDefs } from './types';
import { MdOutlineEdit } from 'react-icons/md';
import { GiCancel, GiConfirmed } from 'react-icons/gi';
import { Formik } from 'formik';

export const TableBody = () => {
  const { data, columnDefs } = useDataTableContext();

  if (!data.length) return <h1>Empty table</h1>;
  return (
    <>
      {data.map((row, i) => (
        <TableRow key={i} data={row} columnDefs={columnDefs} />
      ))}
    </>
  );
};

interface TableRowProps {
  data: unknown;
  columnDefs: ColumnDefs[];
}

const TableRow: FC<TableRowProps> = ({ data, columnDefs }) => {
  const { onRowEdit } = useDataTableContext();

  const rowValues = useMemo(
    () => columnDefs.map((def) => ({ value: data[def.field], field: def.field, type: def.type })),
    [data, columnDefs]
  );

  if (onRowEdit) {
    return <EditableRow onSubmit={onRowEdit} initialValues={{ ...(data as object) }} rowValues={rowValues} />;
  }

  return (
    <div className={'table-row'}>
      {rowValues.map(({ field, value }, i) => (
        <Cell key={i}>{value}</Cell>
      ))}
    </div>
  );
};

interface EditableRowProps {
  onSubmit: (values: unknown) => void;
  initialValues: any;
  rowValues: Array<{ field: string; value: string | number; type: ColumnDefs['type'] }>;
}

const EditableRow: FC<EditableRowProps> = ({ onSubmit, rowValues, initialValues }) => {
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
            <Cell key={i}>
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
            </Cell>
          ))}
          <div className={'table-cell border-b py-3.5 px-2 cursor-pointer'}>
            <div className={'flex gap-3 items-center'}>
              {!isEditing ? (
                <MdOutlineEdit
                  className={'cursor-pointer'}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                />
              ) : (
                <>
                  <GiConfirmed
                    className={'cursor-pointer'}
                    onClick={() => {
                      formik.submitForm();
                    }}
                  />
                  <GiCancel
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

interface CellProps {
  children: ReactElement;
}

const Cell: FC<CellProps> = ({ children }) => {
  return <div className={'table-cell border-b py-3.5 px-2 cursor-pointer'}>{children}</div>;
};
