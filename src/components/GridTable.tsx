import React, { useEffect } from 'react';
import styled from 'styled-components';

import { GridCell } from './GridCell';
import { GridTableContainer } from './GridTableContainer';
import { useGridTable } from '../hooks/useGridTable';

const GridTableStyled = styled.table`
  border-collapse: collapse;
`;

const GridTableHeadingStyled = styled.h2`
  margin: 0;
`;

export const GridTable: React.FC = () => {
  const { data, refresh } = useGridTable();

  useEffect(() => {
    const interval = setInterval(refresh, 400);

    return () => clearInterval(interval);
  }, []);

  // Using index as key is terrible idea for most cases, but is OK here, as they are 100% unique
  return (
    <GridTableContainer>
      <GridTableHeadingStyled>Grid ticker</GridTableHeadingStyled>

      <GridTableStyled cellSpacing={0} cellPadding={0}>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell: number, cellIndex: number) => (
                <GridCell key={`cell-${rowIndex}${cellIndex}`} filled={Boolean(cell)} />
              ))}
            </tr>
          ))}
        </tbody>
      </GridTableStyled>
    </GridTableContainer>
  );
};
