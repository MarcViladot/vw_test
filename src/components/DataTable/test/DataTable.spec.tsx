import { beforeEach, describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { DataTable } from '../DataTable';
import { useTableStore } from '@/components/DataTable/store';

const tableStoreState = useTableStore.getState();

describe('Table Test', () => {
  beforeEach(() => {
    useTableStore.setState(tableStoreState, true);
  });

  it('should render correctly', () => {
    render(<DataTable data={[]} columnDefs={[]} />);
  });

  it('should call setData on data change', () => {
    const columnDefs = [{ headerName: 'Name', field: 'name' }];
    const setDataSpy = vi.spyOn(tableStoreState, 'setData');
    const { rerender } = render(<DataTable data={[{ name: 'John', age: 20 }]} columnDefs={columnDefs} />);
    expect(setDataSpy).toHaveBeenCalledWith([{ name: 'John', age: 20 }], columnDefs);
    rerender(<DataTable data={[{ name: 'Joe', age: 85 }]} columnDefs={columnDefs} />);
    expect(setDataSpy).toHaveBeenCalledWith([{ name: 'Joe', age: 85 }], columnDefs);
  });
});
