import { describe, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { NewRow } from '../components';
import { ColumnDefs } from '../types';

const columnDefs: ColumnDefs[] = [
  { field: 'name', type: 'text', headerName: 'Name' },
  { field: 'age', type: 'number', headerName: 'Age' },
];

describe('NewRow Test', () => {
  it('should render correctly', () => {
    const newRow = { name: 'John', age: 30 };
    render(<NewRow newRow={newRow} columnDefs={columnDefs} onRowAdded={() => {}} onCancel={() => {}} />);
  });

  it('should call onRowAdded when submitted', async () => {
    const newRow = { name: 'John', age: 30 };
    const onRowAddedMock = vi.fn();
    const { getByTestId } = render(
      <NewRow newRow={newRow} columnDefs={columnDefs} onRowAdded={onRowAddedMock} onCancel={() => {}} />
    );

    const submitIcon = getByTestId('submit-icon');
    fireEvent.click(submitIcon);

    // Wait for the asynchronous action to complete
    await waitFor(() => {
      expect(onRowAddedMock).toHaveBeenCalledWith(newRow);
    });
  });

  it('should call onCancel when canceled', () => {
    const newRow = { name: 'John', age: 30 };
    const onCancelMock = vi.fn();
    const { getByTestId } = render(
      <NewRow newRow={newRow} columnDefs={columnDefs} onRowAdded={() => {}} onCancel={onCancelMock} />
    );

    const cancelIcon = getByTestId('cancel-icon');
    fireEvent.click(cancelIcon);

    expect(onCancelMock).toHaveBeenCalled();
  });
});
