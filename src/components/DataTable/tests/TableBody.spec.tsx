import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { DataTableContext } from '@/components/DataTable/context/DataTableContext';
import { TableBody } from '@/components/DataTable/TableBody';

const mockedData = [
  { name: 'Jose', age: 20 },
  { name: 'Pol', age: 85 },
  { name: 'Eloi', age: 30 },
];

const columnDefs = [
  { headerName: 'Name', field: 'name' },
  { headerName: 'Age', field: 'age' },
];

describe('TableBody Test', () => {
  const WithProvider = ({ data }: { data: unknown[] }) => (
    <DataTableContext.Provider
      value={{
        data,
        columnDefs,
        sorting: null,
        toggleSort: vi.fn(),
        handleSearchText: vi.fn(),
        searchText: '',
      }}>
      <TableBody />
    </DataTableContext.Provider>
  );

  it('should render correctly', () => {
    render(<WithProvider data={mockedData} />);
  });
  it('should render Empty table if there is no data', () => {
    const { queryByText } = render(<WithProvider data={[]} />);
    expect(queryByText('Empty table')).toBeTruthy();
  });
  it('should show all data rows', () => {
    const { container } = render(<WithProvider data={mockedData} />);
    const cells = container.getElementsByClassName('table-row');
    expect(cells.length).toBe(mockedData.length);
  });
});
