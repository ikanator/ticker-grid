import { Theme } from 'styled-system';
import { colors } from './colors';
import { space } from './space';

export const defaultTheme: Theme = {
  space: { ...space },
  colors: { ...colors },
  // TODO: add breakpoints, typography, etc.
};
