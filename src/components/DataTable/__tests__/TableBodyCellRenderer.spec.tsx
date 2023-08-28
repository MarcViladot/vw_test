import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { TableBodyCellRenderer } from '../components/TableBodyCellRenderer';

describe('TableBodyCellRenderer Test', () => {
  it('should render correctly', () => {
    render(<TableBodyCellRenderer value={3} cellRenderer={vi.fn()} />);
  });

  it('should render the cellRenderer result', () => {
    const { queryByText } = render(
      <TableBodyCellRenderer value={3} cellRenderer={(value) => <div>Age {String(value)}</div>} />
    );
    expect(queryByText('Age 3')).toBeTruthy();
  });
});
