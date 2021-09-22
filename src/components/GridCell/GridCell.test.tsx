import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../theme/theme';
import { GridCell } from './GridCell';

describe('GridCell', () => {
  it('should render empty cell', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <table>
          <tbody>
            <tr>
              <GridCell filled={false} />
              <GridCell filled />
            </tr>
          </tbody>
        </table>
      </ThemeProvider>
    );

    const cells = Array.from(container.querySelectorAll('td'));

    expect(cells[0]).toHaveStyle('background-color: #fff;');
    expect(cells[1]).toHaveStyle('background-color: #000;');
    expect(container).toMatchSnapshot();
  });
});
