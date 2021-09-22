import { renderHook, act } from '@testing-library/react-hooks';
import { mockRandom, resetMockRandom } from 'jest-mock-random';
import { getCellLiveNeighboursCount, useGridTable } from './useGridTable';

describe('useGridTable', () => {
  it('should handle grid table data refresh', () => {
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

  it('should calculate live neighbours count', () => {
    const data = [
      [1, 1, 0],
      [1, 0, 0],
      [1, 0, 0],
    ];

    expect(getCellLiveNeighboursCount(0, 0, data)).toBe(2);
    expect(getCellLiveNeighboursCount(0, 1, data)).toBe(2);
    expect(getCellLiveNeighboursCount(0, 2, data)).toBe(1);
    expect(getCellLiveNeighboursCount(1, 0, data)).toBe(3);
    expect(getCellLiveNeighboursCount(1, 1, data)).toBe(4);
    expect(getCellLiveNeighboursCount(1, 2, data)).toBe(1);
    expect(getCellLiveNeighboursCount(2, 0, data)).toBe(1);
    expect(getCellLiveNeighboursCount(2, 1, data)).toBe(2);
    expect(getCellLiveNeighboursCount(2, 2, data)).toBe(0);
  });
});
