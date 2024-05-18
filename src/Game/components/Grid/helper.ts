import { Mode, CellGrid, CellObj, Uncover, Algorithm, CascadeResult } from '../type';

/* Helper get all adjacent cells */
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

/* Initialize Grid */
export function createGrid(rows: number, cols: number, mode: Mode): CellGrid {
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
        adjFlags: 0,
        covered: true,
        flagged: false,
      };
    }
  }

  return cellGrid;
}

/* Place all mines on grid */ 
export function placeMines(
  nRows: number, 
  nCols: number, 
  grid: CellGrid, 
  numMines: number
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

/* Replace a mine in event of first click failure */ 
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

/* Place a flag */
export function placeFlag(
  cell: CellObj,
  nRows: number,
  nCols: number,
  grid: CellGrid,
): CellGrid {
  grid[cell.row][cell.col].flagged = true;

  for(const adj of getAdjacent(cell, nRows, nCols, grid)) {
    adj.adjFlags++;
  }
  
  return grid;
}

/* Unplace a flag */
export function removeFlag(
  cell: CellObj,
  nRows: number,
  nCols: number,
  grid: CellGrid,
): CellGrid {
  grid[cell.row][cell.col].flagged = false;

  for(const adj of getAdjacent(cell, nRows, nCols, grid)) {
    adj.adjFlags--;
  }

  return grid;
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

/* Uncover a cell (cell is covered) */
export function uncover(
  grid: CellGrid,
  source: CellObj, 
  rc: number,
  cc: number, 
  flags: number,
  cells: number,
  algo: Algorithm,
): Uncover {
  /* Set cascade function */
  let cascadeFunction: (
    grid: CellGrid, 
    source: CellObj, 
    rc: number, 
    cc: number, 
    flags: number, 
    cells: number
  ) => CascadeResult = (algo == Algorithm.DFS) ? DFS : BFS;
  
  /* Uncover source */
  source.covered = false, cells--;

  /* If mine */
  if(source.mine)
    return {
      hitMine: true,
      remainingFlags: flags,
      remainingCells: cells,
      cascades: 0,
      cascadeTimes: [],
    };

  /* Uncover w/ a cascade involved */
  if(!source.adjMines) {
    let cascadeResult: CascadeResult = cascadeFunction(grid, source, rc, cc, flags, cells);

    return {
      hitMine: false,
      remainingFlags: cascadeResult.remainingFlags,
      remainingCells: cascadeResult.remainingCells,
      cascades: 1,
      cascadeTimes: [cascadeResult.cascadeTime],
    }
  }
  
  /* Single uncover (no cascading) */
  return {
    hitMine: false,
    remainingFlags: flags,
    remainingCells: cells,
    cascades: 0,
    cascadeTimes: [],
  };
}

/* Uncover shortcut (click on covered cell with adequate flags) */
export function uncoverShortcut(
  grid: CellGrid,
  source: CellObj, 
  rc: number,
  cc: number, 
  flags: number,
  cells: number,
  algo: Algorithm,
): Uncover {
  /* Set cascade function */
  let cascadeFunction: (
    grid: CellGrid, 
    source: CellObj, 
    rc: number, 
    cc: number, 
    flags: number, 
    cells: number
  ) => CascadeResult = (algo == Algorithm.DFS) ? DFS : BFS;

  /* Get adjacent */
  let adjacents = getAdjacent(source, rc, cc, grid);
  let toCascade: CellObj[] = [];

  // Store result of cascades
  let totalCascades: number = 0, cascadeTimes: number[] = [];

  /* Iterate over adjacents, check for opportunities to cascade and mines */
  for(let adj of adjacents) {
    if(adj.flagged) continue;

    /* Hit a mine */
    if(adj.mine) {
      adj.covered = false, cells--;
      return {
        hitMine: true,
        remainingFlags: flags,
        remainingCells: cells,
        cascades: 0,
        cascadeTimes: [],
      };
    }

    /* Opportunity to cascade */
    if(adj.adjMines == 0)
      toCascade.push(adj);
  }

  /* Perform cascades */
  toCascade.forEach(newSource => {
    if(!newSource.covered) return; // If its not covered no need to cascade anymore

    /* Perform cascade */
    let cascadeResult: CascadeResult = cascadeFunction(grid, source, rc, cc, flags, cells);

    flags = cascadeResult.remainingFlags;
    cells = cascadeResult.remainingCells;

    totalCascades++;
    cascadeTimes.push(cascadeResult.cascadeTime);
  });

  /* Finally, ensure all adjacents are uncovered */
  adjacents.forEach(adj => {
    if(adj.flagged) return;

    if(adj.covered)
      adj.covered = false, cells--;
  });

  return {
    hitMine: false,
    remainingCells: cells,
    remainingFlags: flags,
    cascades: totalCascades,
    cascadeTimes: cascadeTimes,
  };
}

function DFS(
  grid: CellGrid, 
  source: CellObj, 
  rc: number, 
  cc: number, 
  flags: number, 
  cells: number
): CascadeResult {
  /* Start timer */
  const start = performance.now();

  const stack: Stack = new Stack(source);

  while(stack.size()) {
    let cell: CellObj = stack.pop();
    
    for(let i = Math.max(0, cell.row - 1); i < (cell.row + 2) && i < rc; i++) {
      for(let j = Math.max(0, cell.col - 1); j < (cell.col + 2) && j < cc; j++) {
        if(grid[i][j].covered && !grid[i][j].mine) {
          if(grid[i][j].flagged) grid[i][j].flagged = false, flags++;
          grid[i][j].covered = false, cells--;
          
          if(!grid[i][j].adjMines) stack.push(grid[i][j]);
        }
      }
    }
  }

  /* Stop timer */
  const stop = performance.now();

  console.log(`${start} ${stop}`)

  return {
    remainingFlags: flags,
    remainingCells: cells,
    cascadeTime: stop - start,
  };
}

function BFS(
  grid: CellGrid, 
  source: CellObj, 
  rc: number, 
  cc: number, 
  flags: number, 
  cells: number
): CascadeResult {
  /* Start timer */
  const start = performance.now();

  const queue: Queue = new Queue(source);

  while(queue.size()) {
    let cell: CellObj = queue.pop();
    
    for(let i = Math.max(0, cell.row - 1); i < (cell.row + 2) && i < rc; i++) {
      for(let j = Math.max(0, cell.col - 1); j < (cell.col + 2) && j < cc; j++) {
        if(grid[i][j].covered && !grid[i][j].mine) {
          if(grid[i][j].flagged) grid[i][j].flagged = false, flags++;
          grid[i][j].covered = false, cells--;
          
          if(!grid[i][j].adjMines) queue.push(grid[i][j]);
        }
      }
    }
  }

  /* Stop timer */
  const stop = performance.now();

  return {
    remainingFlags: flags,
    remainingCells: cells,
    cascadeTime: stop - start,
  };
}
