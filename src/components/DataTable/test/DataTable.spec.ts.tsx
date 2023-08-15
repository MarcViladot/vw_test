import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { DataTable } from '../DataTable';

describe('App Test', () => {
  it('should render correctly', () => {
    render(<DataTable />);
  });
});
