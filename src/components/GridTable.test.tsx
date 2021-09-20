import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { GridTable } from './GridTable';
import { defaultTheme } from '../theme/theme';

test('should render grid table', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <GridTable />
    </ThemeProvider>
  );

  const cells = container.querySelectorAll('td');
  expect(cells.length).toBe(2500);
});
