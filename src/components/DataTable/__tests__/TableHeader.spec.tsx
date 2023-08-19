import { describe, expect, it } from 'vitest';
import { fireEvent, render, within } from '@testing-library/react';
import { TableHeader } from '@/components/DataTable/components/TableHeader';
import { DataTableContext, SortingState } from '@/components/DataTable/context/DataTableContext';
import { FC } from 'react';

const mockColumnDefs = [
  { headerName: 'Name', field: 'name' },
  { headerName: 'Age', field: 'age' },
];

const toggleSort = vi.fn();

describe('TableHeader Test', () => {
  const WithProvider: FC<{ sorting?: SortingState }> = ({ sorting }) => (
    <DataTableContext.Provider
      value={{
        data: [],
        columnDefs: mockColumnDefs,
        sorting: sorting ?? null,
        toggleSort,
        handleSearchText: vi.fn(),
        searchText: '',
      }}>
      <TableHeader />
    </DataTableContext.Provider>
  );

  it('should render correctly', () => {
    render(<WithProvider />);
  });
  it('should render all the headers', () => {
    const { container } = render(<WithProvider />);
    const headers = container.getElementsByClassName('table-cell');
    expect(headers.length).toBe(mockColumnDefs.length + 1);
  });
  it('should show sort status on header', () => {
    const { getByTestId, rerender } = render(<WithProvider />);
    const nameHeader = getByTestId('name');
    const { queryByTestId } = within(nameHeader);
    expect(queryByTestId('sort-status')).toBeFalsy();
    rerender(<WithProvider sorting={{ field: 'name', direction: 'asc' }} />);
    expect(queryByTestId('sort-status')).toBeTruthy();
  });
  it('should call toggleSort on header click', () => {
    const container = render(<WithProvider />);
    const nameHeader = container.getByTestId('name');
    fireEvent.click(nameHeader);
    expect(toggleSort).toBeCalledWith('name');
  });
  it('should show sort direction', () => {
    const { getByTestId, rerender } = render(<WithProvider sorting={{ field: 'name', direction: 'asc' }} />);
    const nameHeader = getByTestId('name');
    const { queryByTestId } = within(nameHeader);
    expect(queryByTestId('arrow-up')).toBeTruthy();
    rerender(<WithProvider sorting={{ field: 'name', direction: 'desc' }} />);
    expect(queryByTestId('arrow-down')).toBeTruthy();
  });
});
