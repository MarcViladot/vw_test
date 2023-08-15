import { it, describe } from 'vitest';
import { render } from '@testing-library/react';
import App from '@/App';

describe('App Test', () => {
  it('should render correctly', () => {
    render(<App />);
  });
});
