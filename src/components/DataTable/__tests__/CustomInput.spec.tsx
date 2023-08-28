import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { CustomInput } from '../components/CustomInput';
import { EditOptions, EditOptionsType } from '@/components/DataTable';

const editOptions: EditOptions<EditOptionsType> = {
  type: EditOptionsType.Select,
  options: [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ],
};

describe('CustomInput Test', () => {
  it('should render correctly', () => {
    render(<CustomInput value={'true'} editOptions={editOptions} onChange={vi.fn()} />);
  });
  it('should render select field correctly if type is select', () => {
    const { container } = render(<CustomInput value={'test'} editOptions={editOptions} onChange={vi.fn()} />);
    expect(container.getElementsByTagName('select')).toBeTruthy();
  });
  it('should call onChange when an option is selected', () => {
    const newValue = 'false';
    const onChange = vi.fn();
    const { getByRole } = render(<CustomInput value={'true'} editOptions={editOptions} onChange={onChange} />);

    const selectElement = getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: newValue } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(newValue);
  });
  it('should call onChange with parsed value', () => {
    const options: EditOptions<EditOptionsType> = {
      ...editOptions,
      parseValue: (value) => value === 'true',
    };
    const newValue = 'false';
    const onChange = vi.fn();
    const { getByRole } = render(<CustomInput value={'true'} editOptions={options} onChange={onChange} />);

    const selectElement = getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: newValue } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(false);
  });
});
