import { DefaultTheme } from 'styled-components';
import { colors } from './colors';
import { space } from './space';

export const defaultTheme: DefaultTheme = {
  space: { ...space },
  colors: { ...colors },
  // TODO: add breakpoints, typography, etc.
};
