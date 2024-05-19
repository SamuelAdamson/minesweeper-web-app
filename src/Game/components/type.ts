export type Mode = 'small' | 'medium' | 'large';
export type AdjacentStr = 'zero' | 'one' | 'two' | 'three' | 'fourplus';

/* Result of cascade specifically */
export type CascadeResult = {
  remainingFlags: number,
  remainingCells: number,
  cascadeTime: number,    // Milliseconds
}

/* Result of total uncover process */
export type Uncover = {
  hitMine: boolean,         // Did uncover result in hit mine
  remainingFlags: number,   // Remaining flags after uncover
  remainingCells: number,   // Remaining cells after uncover
  cascades: number,         // Number of cascade searches made (Could be more than one in shortcut uncovers)
  cascadeTimes: number[],   // Casecade run times (milliseconds)
};

/* Cascade type used in onCascade calls */
export type Cascade = {
  count: number,
  times: number[],
}

export enum Algorithm {
  DFS,
  BFS
};

export type CellObj = {
  row: number;
  col: number;
  key: number;
  mine: Boolean;
  adjMines: number;
  adjFlags: number;
  covered: Boolean;
  flagged: Boolean;
};

export type CellGrid = CellObj[][];

export type Dimension = [number, number];