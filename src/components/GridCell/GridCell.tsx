import React from 'react';
import { GridCellStyled } from './GridCell.styled';

type GridCellProps = {
  filled: boolean;
};

export const GridCell: React.FC<GridCellProps> = ({ filled }) => (
  <GridCellStyled backgroundColor={filled ? 'common.filled' : 'common.empty'} padding="md" />
);
