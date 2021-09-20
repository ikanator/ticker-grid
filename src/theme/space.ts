export interface Space {
  none: number;
  sm: number;
  md: number;
  lg: number;
}

// 0, 2, 4, 8... is preferred, but used custom ones here
export const space: Space = {
  none: 0,
  sm: 2,
  md: 6,
  lg: 12,
};
