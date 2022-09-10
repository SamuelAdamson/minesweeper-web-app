import { Mode, CellGrid, CellObj } from '../type';

export function createGrid(rows: Number, cols: Number, mode: Mode): CellGrid {
  let cellGrid: CellGrid = [];

  for (let i = 0; i < rows; i++) {
    cellGrid[i] = [];
    for (let j = 0; j < cols; j++) {
      cellGrid[i][j] = {
        row: i,
        col: j,
        mine: false,
        covered: true,
        adjacentNum: 0,
      };
    }
  }

  return cellGrid;
}


function getAdjacent(  
  source: CellObj,
  nRows: number, 
  nCols: number, 
  grid: CellGrid
): CellObj[] {
  let adjacent: CellObj[] = [];

  for(let i = Math.max(source.row-1, 0); i <= source.row+1 && i < nRows; i++) {
    for(let j = Math.max(source.col-1, 0); j <= source.col+1 && j < nCols; j++) {
      if(i != source.row || j != source.col) {
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

    for(const cell of getAdjacent(grid[row][col], nRows, nCols, grid)) {
      cell.adjacentNum++;
    }
    grid[row][col].mine = true;
  }
}


export function replaceMine(
  cell: CellObj,
  nRows: number, 
  nCols: number, 
  grid: CellGrid
): void {
  placeMines(nRows, nCols, grid, 1);
  for(const adj of getAdjacent(cell, nRows, nCols, grid)) {
    cell.adjacentNum--;
  }
  cell.mine = false;
}

/**
 * Important note on the below functions. In JavaScript, objects 
 * and arrays are passed by reference. So, we are not creating 
 * large swaths of memories in execution. Instead, we are simply 
 * storing memory addresses.
 */


export function BFS(grid: CellGrid, source: CellObj): void {

}


export function DFS(grid: CellGrid, source: CellObj): void {
  const stack: [CellObj] = [source];

  while(stack.length > 0) {
    let cell = stack.pop();
    // cell.covered = false; TODO

  }
}


export function recursiveDFS(grid: CellGrid, source: CellObj): void {

}