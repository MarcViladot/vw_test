import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
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
});
