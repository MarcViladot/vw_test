import { FC } from 'react';
import { DataTableContext } from '@/components/DataTable/context/DataTableContext';
import { fireEvent, render } from '@testing-library/react';
import { ActionsCell } from '@/components/DataTable/components/ActionsCell';

describe('ActionsCell Test', () => {
  const onRowDelete = vi.fn();
  const onRowPreview = vi.fn();
  const mockData = { id: 1, name: 'Item 1' };

  const WithProvider: FC<{ hideContent: boolean }> = ({ hideContent }) => (
    <DataTableContext.Provider
      value={{
        data: [],
        columnDefs: [],
        sorting: null,
        toggleSort: vi.fn(),
        handleSearchText: vi.fn(),
        searchText: '',
        onRowDelete,
        onRowPreview,
      }}>
      <ActionsCell data={mockData} rowIndex={0} hideContent={hideContent}>
        <span>Child Content</span>
      </ActionsCell>
    </DataTableContext.Provider>
  );

  it('should render children without icons when hideContent is true', () => {
    const { queryByText, queryByTestId } = render(<WithProvider hideContent={true} />);

    expect(queryByText('Child Content')).toBeTruthy();
    expect(queryByTestId('trash-icon')).not.toBeTruthy();
    expect(queryByTestId('eye-icon')).not.toBeTruthy();
  });

  it('should render children with icons when hideContent is false', () => {
    const { queryByText, queryByTestId } = render(<WithProvider hideContent={false} />);

    expect(queryByText('Child Content')).toBeTruthy();
    expect(queryByTestId('trash-icon')).toBeTruthy();
    expect(queryByTestId('eye-icon')).toBeTruthy();
  });

  it('should call onRowDelete when delete icon is clicked', () => {
    const { getByTestId } = render(<WithProvider hideContent={false} />);
    const deleteIcon = getByTestId('trash-icon');

    fireEvent.click(deleteIcon);

    expect(onRowDelete).toHaveBeenCalledWith({ row: 0, data: mockData });
  });

  it('should call onRowPreview when preview icon is clicked', () => {
    const { getByTestId } = render(<WithProvider hideContent={false} />);
    const previewIcon = getByTestId('eye-icon');

    fireEvent.click(previewIcon);

    expect(onRowPreview).toHaveBeenCalledWith(mockData);
  });

  it('should not render the icons if the functions are not defined', () => {
    const { queryByTestId } = render(
      <DataTableContext.Provider
        value={{
          data: [],
          columnDefs: [],
          sorting: null,
          toggleSort: vi.fn(),
          handleSearchText: vi.fn(),
          searchText: '',
        }}>
        <ActionsCell data={mockData} rowIndex={0} hideContent={false}>
          <span>Child Content</span>
        </ActionsCell>
      </DataTableContext.Provider>
    );

    expect(queryByTestId('eye-icon')).toBeFalsy();
    expect(queryByTestId('trash-icon')).toBeFalsy();
  });
});
