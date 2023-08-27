import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { DataTableContext } from '@/components/DataTable/context/DataTableContext';
import { TableBody } from '@/components/DataTable/components/TableBody';
import { ColumnDefs } from '@/components/DataTable';

interface Model {
  name: string;
  age: number;
}

const mockedData: Model[] = [
  { name: 'Jose', age: 20 },
  { name: 'Pol', age: 85 },
  { name: 'Eloi', age: 30 },
];

const columnDefs: Array<ColumnDefs<Model>> = [
  { headerName: 'Name', field: 'name', type: 'text' },
  { headerName: 'Age', field: 'age', type: 'number' },
];

describe('TableBody Test', () => {
  const WithProvider = ({ data }: { data: Model[] }) => (
    <DataTableContext.Provider
      value={{
        data,
        columnDefs,
        sorting: null,
        toggleSort: vi.fn(),
        handleSearchText: vi.fn(),
        searchText: '',
      }}>
      <TableBody newRow={undefined} cancelNewRow={vi.fn()} />
    </DataTableContext.Provider>
  );

  it('should render correctly', () => {
    render(<WithProvider data={mockedData} />);
  });
  it('should render Empty table if there is no data', () => {
    const { queryByText } = render(<WithProvider data={[]} />);
    expect(queryByText('No data')).toBeTruthy();
  });
  it('should show all data rows', () => {
    const { container } = render(<WithProvider data={mockedData} />);
    const cells = container.getElementsByClassName('table-row');
    expect(cells.length).toBe(mockedData.length);
  });
});
