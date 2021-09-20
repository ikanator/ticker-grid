import React from 'react';
import styled from 'styled-components';
import { color, ColorProps, space, SpaceProps } from 'styled-system';

type GridCellProps = {
  filled: boolean;
};

interface GridProps extends ColorProps, SpaceProps {}

const GridCellStyled = styled.td<GridProps>`
  ${color};
  ${space};
  border: ${({ theme }) => `${theme.space.sm}px solid ${theme.colors.common.secondary}`};
`;

export const GridCell: React.FC<GridCellProps> = ({ filled }) => (
  <GridCellStyled backgroundColor={filled ? 'common.filled' : 'common.empty'} padding="md" />
);
