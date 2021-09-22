import { useState } from 'react';
import { GRID_TABLE_DIMENSION } from '../../constants';

type TableDataType = Array<Array<number>>;

type GridTableReturnType = {
  data: TableDataType;
  refresh: () => void;
};

export const getCellLiveNeighboursCount = (rowIdx: number, cellIdx: number, tableRows: TableDataType): number => {
  let count = 0;

  // List cells around current
  for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
    for (let j = cellIdx - 1; j <= cellIdx + 1; j++) {
      // Skip current cell
      if (i === rowIdx && j === cellIdx) continue;

      // Push 0 if out of table bounds
      count += tableRows?.[i]?.[j] || 0;
    }
  }

  return count;
};

const getTableInitialState = (size: number): TableDataType => {
  // Generate array of length 50 with randomly filled rows
  return Array.from({ length: size }, () => {
    return Array.from({ length: size }, () => Math.round(Math.random()));
  });
};

export const useGridTable = (size = GRID_TABLE_DIMENSION): GridTableReturnType => {
  const [rows, setRows] = useState<TableDataType>(() => getTableInitialState(size));

  // Handle refresh grid table data
  const refresh = () => {
    setRows((prevState: TableDataType) => {
      // TODO: Investigate performance. Split in two operations in one loop if needed by iterating from top-left and bottom-right corner of matrix simultaneously. Keeping as simple as possible unless we face any performance issues
      return prevState.map((row: Array<number>, rowIdx: number) => {
        return row.map((cell: number, cellIdx: number) => {
          const liveNeighboursCount = getCellLiveNeighboursCount(rowIdx, cellIdx, prevState);

          if (liveNeighboursCount < 2) {
            return 0;
          } else if ((cell && liveNeighboursCount === 2) || liveNeighboursCount === 3) {
            return 1;
          }
          return 0;
        });
      });
    });
  };

  return {
    data: rows,
    refresh,
  };
};