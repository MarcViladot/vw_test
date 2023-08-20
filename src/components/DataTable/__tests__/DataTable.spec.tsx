import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { DataTable } from '../DataTable';
import { TableOptions } from '@/components/DataTable';

describe('Table Test', () => {
  const options: TableOptions = {
    data: [],
    columnDefs: [],
  };

  it('should render correctly', () => {
    render(<DataTable options={options} />);
  });
});
