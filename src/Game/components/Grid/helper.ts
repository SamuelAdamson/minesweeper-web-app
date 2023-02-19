import { Mode, CellGrid, CellObj, Uncover, Algorithm } from '../type';

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
        adjMines: 0,
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
      cell.adjMines++;
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
    adj.adjMines--;
  }
  cell.mine = false;
}

/**
 * Important note on the below functions. In JavaScript, objects 
 * and arrays are passed by reference. So, we are not creating 
 * large swaths of memories in execution. Instead, we are simply 
 * storing memory addresses.
 */


class Queue {
  q: Array<CellObj>;
  head: number;

  constructor(cell: CellObj) {
    this.q = [cell];
    this.head = 0;
  }

  /* Assumes that queue has at least one member */
  pop(): CellObj {
    const front: CellObj = this.q[this.head];
    delete this.q[this.head];
    this.head++;

    return front;
  }

  push(cell: CellObj): void {
    this.q.push(cell);
  }

  size(): Number { return (this.head - this.q.length) };
}

class Stack {
  s: Array<CellObj>;

  constructor(cell: CellObj) {
    this.s = [cell];
  }

  /* Assumes that queue has at least one member */
  pop(): CellObj {
    return this.s.pop()!;
  }

  push(cell: CellObj): void {
    this.s.push(cell);
  }

  size(): Number { return this.s.length };
}

export function uncover(
  grid: CellGrid, 
  source: CellObj, 
  rc: number, cc: number, 
  flags: number,
  cells: number,
  algo: Algorithm
): Uncover {
  if(!source.adjMines) {
    switch(algo) {
      case 0: return(DFS(grid, source, rc, cc, flags, cells));
      case 1: return(BFS(grid, source, rc, cc, flags, cells));
      case 2: return(recursiveDFS(grid, source, rc, cc, flags, cells));
    }
  }
  
  source.covered = false;
  return [flags, cells - 1];
}

function DFS(
  grid: CellGrid, 
  source: CellObj, 
  rc: number, 
  cc: number, 
  flags: number, 
  cells: number
): Uncover {
  const stack: Stack = new Stack(source);

  while(stack.size()) {
    let cell: CellObj = stack.pop();
    
    for(let i = Math.max(0, cell.row - 1); i < (cell.row + 2) && i < rc; i++) {
      for(let j = Math.max(0, cell.col - 1); j < (cell.col + 2) && j < cc; j++) {
        if(grid[i][j].covered) {
          if(grid[i][j].flagged) grid[i][j].flagged = false, flags++;
          grid[i][j].covered = false, cells--;
          
          if(!grid[i][j].adjMines) stack.push(grid[i][j]);
        }
      }
    }
  }

  return [flags, cells];
}

function BFS(
  grid: CellGrid, 
  source: CellObj, 
  rc: number, 
  cc: number, 
  flags: number, 
  cells: number
): Uncover {
  const queue: Queue = new Queue(source);

  while(queue.size()) {
    let cell: CellObj = queue.pop();
    
    for(let i = Math.max(0, cell.row - 1); i < (cell.row + 2) && i < rc; i++) {
      for(let j = Math.max(0, cell.col - 1); j < (cell.col + 2) && j < cc; j++) {
        if(grid[i][j].covered) {
          if(grid[i][j].flagged) grid[i][j].flagged = false, flags++;
          grid[i][j].covered = false, cells--;
          
          if(!grid[i][j].adjMines) queue.push(grid[i][j]);
        }
      }
    }
  }

  return [flags, cells];
}

function recursiveDFS(
  grid: CellGrid, 
  source: CellObj, 
  rc: number, 
  cc: number, 
  flags: number, 
  cells: number
): Uncover {
  if(source.flagged) source.flagged = false, flags++;
  source.covered = false, cells--;

  if(!source.adjMines) {
    for(let i = Math.max(0, source.row - 1); i < (source.row + 2) && i < rc; i++) {
      for(let j = Math.max(0, source.col - 1); j < (source.col + 2) && j < cc; j++) {
        if(grid[i][j].covered) {
          [flags, cells] = recursiveDFS(grid, grid[i][j], rc, cc, flags, cells)
        }
      }
    }
  }
  
  return [flags, cells];
}

function IDDFS(
  grid: CellGrid, 
  source: CellObj, 
  rc: number, 
  cc: number, 
  flags: number, 
  cells: number
): Uncover {
  return [flags, cells]
}