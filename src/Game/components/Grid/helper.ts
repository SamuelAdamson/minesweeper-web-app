import { Mode, CellGrid, CellObj } from '../type';

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


function getAdjacent(  
  row: number, 
  col: number, 
  nRows: number, 
  nCols: number, 
  grid: CellGrid
): CellObj[] {
  let adjacent: CellObj[] = [];

  for(let i = Math.max(row-1, 0); i <= row+1 && i < nRows; i++) {
    for(let j = Math.max(col-1, 0); j <= col+1 && j < nCols; j++) {
      if(i != row || j != col) {
        adjacent.push(grid[i][j]);
      }
    }
  }

  return adjacent;
}


export function placeMines(
  nRows: number, 
  nCols: number, 
  grid: CellGrid, 
  numMines: Number
): void {
  let row = Math.floor(Math.random() * nRows);
  let col = Math.floor(Math.random() * nCols);

  for(let i = 0; i < numMines; i++) {
    while(grid[row][col].mine) {
      row = Math.floor(Math.random() * nRows);
      col = Math.floor(Math.random() * nCols);
    }

    for(const cell of getAdjacent(row, col, nRows, nCols, grid)) {
      cell.adjacentNum++;
    }
    grid[row][col].mine = true;
  }
}


export function replaceMine(
  row: number, 
  col: number, 
  nRows: number, 
  nCols: number, 
  grid: CellGrid
): void {
  placeMines(nRows, nCols, grid, 1);
  for(const cell of getAdjacent(row, col, nRows, nCols, grid)) {
    cell.adjacentNum--;
  }
  grid[row][col].mine = false;
}


export function bfs(grid: CellGrid, row: Number, col: Number) {

}

export function dfs(grid: CellGrid, row: Number, col: Number) {

}