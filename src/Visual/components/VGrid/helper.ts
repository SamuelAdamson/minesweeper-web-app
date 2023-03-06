import { VCellObj, VCellGrid } from '../type';

export function createGrid(rows: Number, cols: Number): VCellGrid {
  let cellGrid: VCellGrid = [];

  for (let i = 0; i < rows; i++) {
    cellGrid[i] = [];
    for (let j = 0; j < cols; j++) {
      cellGrid[i][j] = {
        row: i,
        col: j,
        key: i * 100 + j,
        covered: true
      };
    }
  }

  return cellGrid;
}