import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { GridTable } from './Grid';
import { defaultTheme } from '../../theme/theme';
import { GRID_TABLE_DIMENSION } from '../../constants';

test('should render grid table', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <GridTable />
    </ThemeProvider>
  );

  const cells = container.querySelectorAll('td');
  expect(cells.length).toBe(GRID_TABLE_DIMENSION * GRID_TABLE_DIMENSION);
});
