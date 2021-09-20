import { useState } from 'react';
import { GRID_TABLE_DIMENSION } from '../constants';

type TableDataType = Array<Array<number>>;

type GridTableReturnType = {
  data: TableDataType;
  refresh: () => void;
};

const getCellNeighbours = (rowIdx: number, cellIdx: number, tableRows: TableDataType): Array<number> => {
  const neighbours = [];

  // List cells around current
  for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
    for (let j = cellIdx - 1; j <= cellIdx + 1; j++) {
      // Skip current cell
      if (i === rowIdx && j === cellIdx) continue;

      // Push 0 if out of table bounds
      neighbours.push(tableRows?.[i]?.[j] || 0);
    }
  }

  return neighbours;
};

export const useGridTable = (size = GRID_TABLE_DIMENSION): GridTableReturnType => {
  const [rows, setRows] = useState(() => {
    // Generate array of length 50 with randomly filled rows
    return Array.from({ length: size }, () => {
      return Array.from({ length: size }, () => Math.round(Math.random()));
    });
  });

  // Handle refresh grid table data
  const refresh = () => {
    setRows((prevState) => {
      return prevState.map((row, rowIdx) => {
        return row.map((cell, cellIdx) => {
          const neighbours = getCellNeighbours(rowIdx, cellIdx, prevState);
          const sumOfNeighbours = neighbours.reduce((prev, curr) => prev + curr, 0);

          switch (true) {
            case sumOfNeighbours < 2:
              return 0;
            case cell && [2, 3].includes(sumOfNeighbours):
              return 1;
            case sumOfNeighbours === 3:
              return 1;
            default:
              return 0;
          }
        });
      });
    });
  };

  return {
    data: rows,
    refresh,
  };
};
