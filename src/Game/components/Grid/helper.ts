import { Mode, CellGrid, CellObj, Uncover } from '../type';

export function createGrid(rows: Number, cols: Number, mode: Mode): CellGrid {
  let cellGrid: CellGrid = [];

  for (let i = 0; i < rows; i++) {
    cellGrid[i] = [];
    for (let j = 0; j < cols; j++) {
      cellGrid[i][j] = {
        row: i,
        col: j,
        key: i * 100 + j,
        mine: false,
        adjacentNum: 0,
        covered: true,
        flagged: false,
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
    adj.adjacentNum--;
  }
  cell.mine = false;
}

/**
 * Important note on the below functions. In JavaScript, objects 
 * and arrays are passed by reference. So, we are not creating 
 * large swaths of memories in execution. Instead, we are simply 
 * storing memory addresses.
 */


export function uncover(
  grid: CellGrid, 
  source: CellObj, 
  rc: number, cc: number, 
  flags: number,
  cells: number
): Uncover {
  if(!source.adjacentNum) {
    return(DFS(grid, source, rc, cc, flags, cells));
    // BFS(grid, source, rc, cc);
    // recursiveDFS(grid, source, rc, cc);
  }
  
  source.covered = false;
  return [flags, 1];
}

export function BFS(grid: CellGrid, source: CellObj): void {

}


export function DFS(
  grid: CellGrid, 
  source: CellObj, 
  rc: number, 
  cc: number, 
  flags: number, 
  cells: number
): Uncover {
  const stack: [CellObj] = [source];

  while(stack.length > 0) {
    let cell: CellObj = stack.pop()!;
    
    for(let i = cell.row - 1; i < cell.row + 2; i++) {
      for(let j = cell.col - 1; j < cell.col + 2; j++) {
        if(i >= 0 && i < rc && j >= 0 && j < cc && grid[i][j].covered && !grid[i][j].mine) {
          if(grid[i][j].flagged) grid[i][j].flagged = false, flags--;
          
          grid[i][j].covered = false;
          cells--;
          
          if(!grid[i][j].adjacentNum) stack.push(grid[i][j]);
        }
      }
    }
  }

  return [flags, cells];
}


export function recursiveDFS(grid: CellGrid, source: CellObj): void {

}