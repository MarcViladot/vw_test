import React, { FC } from 'react';
import { EditOptions, EditOptionsType } from '../types';

interface Props {
  value: unknown;
  editOptions: EditOptions<EditOptionsType>;
  onChange: (value: unknown) => void;
}

export const CustomInput: FC<Props> = ({ value, editOptions, onChange }) => {
  switch (editOptions.type) {
    case EditOptionsType.Select: {
      return (
        <SelectInput
          value={String(value)}
          options={editOptions.options}
          onChange={(value) => {
            const parsedValue = editOptions.parseValue ? editOptions.parseValue(value) : value;
            onChange(parsedValue);
          }}
        />
      );
    }
  }
};

interface SelectInputProps {
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

const SelectInput: FC<SelectInputProps> = ({ value, options, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}>
      {options.map(({ value, label }, i) => (
        <option key={i} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
