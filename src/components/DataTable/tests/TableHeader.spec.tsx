import { describe, expect, it } from 'vitest';
import { fireEvent, render, within } from '@testing-library/react';
import { TableHeader } from '@/components/DataTable/TableHeader';
import { DataTableProvider } from '@/components/DataTable/context/DataTableContext';

const mockColumnDefs = [
  { headerName: 'Name', field: 'name' },
  { headerName: 'Age', field: 'age' },
];

describe('TableHeader Test', () => {
  const WithProvider = () => (
    <DataTableProvider data={[]} columnDefs={mockColumnDefs}>
      <TableHeader />
    </DataTableProvider>
  );

  it('should render correctly', () => {
    render(<WithProvider />);
  });
  it('should render all the headers', () => {
    const { container } = render(<WithProvider />);
    const headers = container.getElementsByClassName('table-cell');
    expect(headers.length).toBe(mockColumnDefs.length);
  });
  it('should show sort status on header click', () => {
    const container = render(<WithProvider />);
    const nameHeader = container.getByTestId('name');
    const { queryByTestId } = within(nameHeader);
    expect(queryByTestId('sort-status')).toBeFalsy();
    fireEvent.click(nameHeader);
    expect(queryByTestId('sort-status')).toBeTruthy();
  });
  it('should toggle sort icons on header click', () => {
    const container = render(<WithProvider />);
    const nameHeader = container.getByTestId('name');
    const { queryByTestId } = within(nameHeader);
    expect(queryByTestId('sort-status')).toBeFalsy();
    fireEvent.click(nameHeader);
    expect(queryByTestId('arrow-up')).toBeTruthy();
    fireEvent.click(nameHeader);
    expect(queryByTestId('arrow-down')).toBeTruthy();
    fireEvent.click(nameHeader);
    expect(queryByTestId('sort-status')).toBeFalsy();
  });
  it('should show/hide sort status on diff headers click', () => {
    const container = render(<WithProvider />);
    const nameHeader = container.getByTestId('name');
    const ageHeader = container.getByTestId('age');
    expect(container.queryByTestId('sort-status')).toBeFalsy();
    fireEvent.click(nameHeader);
    expect(within(nameHeader).queryByTestId('sort-status')).toBeTruthy();
    fireEvent.click(ageHeader);
    expect(within(nameHeader).queryByTestId('sort-status')).toBeFalsy();
    expect(within(ageHeader).queryByTestId('sort-status')).toBeTruthy();
  });
});
