import 'styled-components';
import { ThemeColors } from './theme/colors';

declare module 'styled-components' {
  export interface DefaultTheme {
    space: { [key: string]: string | number };
    colors: ThemeColors;
  }
}
