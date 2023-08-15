import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { DataTable } from '../DataTable';

describe('Table Test', () => {
  it('should render correctly', () => {
    render(<DataTable data={[]} columnDefs={[]} />);
  });
});
