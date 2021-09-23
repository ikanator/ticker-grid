import React, { useEffect } from 'react';

import { GridCell } from '../GridCell/GridCell';
import { GridContainerStyled, GridContentStyled, GridHeadingStyled } from './Grid.styled';
import { useGridTable } from '../../hooks/useGridTable/useGridTable';
import { REFRESH_INTERVAL } from '../../constants';

export const GridTable: React.FC = () => {
  const { data, refresh } = useGridTable();

  useEffect(() => {
    const interval = setInterval(refresh, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Using index as key is terrible idea for most cases, but is OK here, as they are 100% unique
  return (
    <GridContainerStyled>
      <GridHeadingStyled>Grid ticker</GridHeadingStyled>

      <GridContentStyled cellSpacing={0} cellPadding={0}>
        <tbody>
          {data.map((row: Array<boolean>, rowIndex: number) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell: boolean, cellIndex: number) => (
                <GridCell key={`cell-${rowIndex}${cellIndex}`} filled={cell} />
              ))}
            </tr>
          ))}
        </tbody>
      </GridContentStyled>
    </GridContainerStyled>
  );
};
