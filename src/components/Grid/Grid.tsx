import React, { useEffect } from 'react';

import { GridCell } from '../GridCell/GridCell';
import { GridContainerStyled, GridContentStyled, GridHeadingStyled } from './Grid.styled';
import { useGridTable } from '../../hooks/useGridTable/useGridTable';

export const GridTable: React.FC = () => {
  const { data, refresh } = useGridTable();

  useEffect(() => {
    const interval = setInterval(refresh, 400);

    return () => clearInterval(interval);
  }, []);

  // Using index as key is terrible idea for most cases, but is OK here, as they are 100% unique
  return (
    <GridContainerStyled>
      <GridHeadingStyled>Grid ticker</GridHeadingStyled>

      <GridContentStyled cellSpacing={0} cellPadding={0}>
        <tbody>
          {data.map((row: Array<number>, rowIndex: number) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell: number, cellIndex: number) => (
                <GridCell key={`cell-${rowIndex}${cellIndex}`} filled={Boolean(cell)} />
              ))}
            </tr>
          ))}
        </tbody>
      </GridContentStyled>
    </GridContainerStyled>
  );
};
