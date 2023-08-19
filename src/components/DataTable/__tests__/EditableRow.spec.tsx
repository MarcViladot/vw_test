import { describe, expect, it } from 'vitest';
import { EditableRow } from '../components';
import { RowValues } from '../types';
import { fireEvent, render, waitFor } from '@testing-library/react';

const initialValues = {
  field1: 'Value 1',
  field2: 'Value 2',
};

const rowValues: RowValues[] = [
  { field: 'field1', value: 'Value 1', type: 'text' },
  { field: 'field2', value: 'Value 2', type: 'text' },
];

describe('EditableRow Test', () => {
  it('renders the initial values in non-edit mode', () => {
    const { queryByText } = render(
      <EditableRow onSubmit={vi.fn()} initialValues={initialValues} rowValues={rowValues} />
    );

    expect(queryByText('Value 1')).toBeTruthy();
    expect(queryByText('Value 2')).toBeTruthy();
  });

  it('switches to edit mode when edit icon is clicked', () => {
    const { container, getByTestId } = render(
      <EditableRow onSubmit={vi.fn()} initialValues={initialValues} rowValues={rowValues} />
    );

    fireEvent.click(getByTestId('edit-icon'));

    expect(container.getElementsByTagName('input').length).toBeTruthy();
  });

  it('submits the form when confirmation icon is clicked', async () => {
    const onSubmitMock = vi.fn();
    const { container, getByTestId } = render(
      <EditableRow onSubmit={onSubmitMock} initialValues={initialValues} rowValues={rowValues} />
    );

    fireEvent.click(getByTestId('edit-icon'));
    fireEvent.change(container.getElementsByTagName('input')[0], { target: { value: 'New Value' } });
    fireEvent.click(getByTestId('submit-icon'));

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({ field1: 'New Value', field2: 'Value 2' });
    });
  });

  it('cancels editing when cancel icon is clicked', () => {
    const { container, getByTestId, queryByText } = render(
      <EditableRow onSubmit={vi.fn()} initialValues={initialValues} rowValues={rowValues} />
    );

    fireEvent.click(getByTestId('edit-icon'));
    fireEvent.change(container.getElementsByTagName('input')[0], { target: { value: 'New Value' } });
    expect(queryByText('Value 1')).toBeFalsy();

    fireEvent.click(getByTestId('cancel-icon'));
    expect(queryByText('Value 1')).toBeTruthy();
  });

  it('should call onDelete on trash click', () => {
    const onDelete = vi.fn();
    const { getByTestId } = render(
      <EditableRow onSubmit={vi.fn()} onDelete={onDelete} initialValues={initialValues} rowValues={rowValues} />
    );
    fireEvent.click(getByTestId('trash-icon'));
    expect(onDelete).toHaveBeenCalled();
  });
});
