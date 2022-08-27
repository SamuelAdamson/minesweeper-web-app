import { Mode, CellObj, CellGrid } from '../type';

export function createGrid(rows: Number, cols: Number, mode: Mode): CellGrid {
  let cellGrid: CellGrid = [];

  for (let i = 0; i < rows; i++) {
    cellGrid[i] = [];
    for (let j = 0; j < cols; j++) {
      cellGrid[i][j] = {
        mode: mode,
        mine: false,
        adjacentNum: 0,
      };
    }
  }

  return cellGrid;
}

export function placeMines(
  rows: Number,
  cols: Number,
  grid: CellGrid,
  numMines: Number
) {}
