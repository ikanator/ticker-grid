import { useState } from 'react';
import { GRID_TABLE_DIMENSION } from '../../constants';

type TableDataType = Array<Array<boolean>>;

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

      // Increment live neighbours count
      if (tableRows?.[i]?.[j]) {
        count += 1;
      }
    }
  }

  return count;
};

const getTableInitialState = (size: number): TableDataType => {
  // Generate array of length 50 with randomly filled rows
  return Array.from({ length: size }, () => {
    return Array.from({ length: size }, () => Boolean(Math.round(Math.random())));
  });
};

export const useGridTable = (size = GRID_TABLE_DIMENSION): GridTableReturnType => {
  const [rows, setRows] = useState<TableDataType>(() => getTableInitialState(size));

  // Handle refresh grid table data
  const refresh = () => {
    setRows((prevState: TableDataType) => {
      // TODO: Investigate performance. Split in two operations in one loop if needed by iterating from top-left and bottom-right corner of matrix simultaneously. Keeping as simple as possible unless we face any performance issues
      return prevState.map((row: Array<boolean>, rowIdx: number) => {
        return row.map((cell: boolean, cellIdx: number) => {
          const liveNeighboursCount = getCellLiveNeighboursCount(rowIdx, cellIdx, prevState);

          if (liveNeighboursCount < 2) {
            return false;
          } else if ((cell && liveNeighboursCount === 2) || liveNeighboursCount === 3) {
            return true;
          }
          return false;
        });
      });
    });
  };

  return {
    data: rows,
    refresh,
  };
};
