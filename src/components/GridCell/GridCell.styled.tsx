import styled from 'styled-components';
import { color, space, ColorProps, SpaceProps } from 'styled-system';

interface GridCellStyledProps extends ColorProps, SpaceProps {}

export const GridCellStyled = styled.td<GridCellStyledProps>`
  ${color};
  ${space};
  border: ${({ theme }) => `${theme.space.sm}px solid ${theme.colors.common.secondary}`};
`;
