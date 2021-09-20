import { renderHook, act } from '@testing-library/react-hooks';
import { mockRandom, resetMockRandom } from 'jest-mock-random';
import { useGridTable } from './useGridTable';

test('should handle grid table data refresh', () => {
  mockRandom([0.1, 0.1, 0.1, 0.6, 0.6, 0.6, 0.1, 0.1, 0.1]);

  const { result } = renderHook(() => useGridTable(3));

  expect(result.current.data).toEqual([
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]);

  act(() => {
    result.current.refresh();
  });

  expect(result.current.data).toEqual([
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ]);

  act(() => {
    result.current.refresh();
  });

  expect(result.current.data).toEqual([
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]);

  resetMockRandom();
});
