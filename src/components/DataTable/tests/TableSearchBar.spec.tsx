import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { DataTableProvider } from '@/components/DataTable/context/DataTableContext';
import { TableSearchBar } from '@/components/DataTable/TableSearchBar';

describe('TableSearchBar Test', () => {
  const WithProvider = () => (
    <DataTableProvider data={[]} columnDefs={[]}>
      <TableSearchBar />
    </DataTableProvider>
  );

  it('should render correctly', () => {
    render(<WithProvider />);
  });
  it('should show input change', () => {
    const { getByPlaceholderText, debug } = render(<WithProvider />);
    const input = getByPlaceholderText('🔍 Search anything') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '1234' } });
    debug();
    console.log(input);
    expect(input.value).toBe('1234');
  });
});
