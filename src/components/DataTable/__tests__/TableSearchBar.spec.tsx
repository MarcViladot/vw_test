import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { DataTableContext } from '@/components/DataTable/context/DataTableContext';
import { TableSearchBar } from '@/components/DataTable/components/TableSearchBar';

const handleSearch = vi.fn();

describe('TableSearchBar Test', () => {
  const WithProvider = () => (
    <DataTableContext.Provider
      value={{
        data: [],
        columnDefs: [],
        sorting: null,
        toggleSort: vi.fn(),
        handleSearchText: handleSearch,
        searchText: '',
      }}>
      <TableSearchBar />
    </DataTableContext.Provider>
  );

  it('should render correctly', () => {
    render(<WithProvider />);
  });
  it('should call handleSearchText on input change', () => {
    const { getByPlaceholderText } = render(<WithProvider />);
    const input = getByPlaceholderText('🔍 Search anything') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '1234' } });
    expect(handleSearch).toBeCalledWith('1234');
  });
});
