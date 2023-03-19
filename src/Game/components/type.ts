export type Mode = 'easy' | 'medium' | 'hard';
export type AdjacentStr = 'zero' | 'one' | 'two' | 'three' | 'fourplus';
export type Uncover = [number, number];

export enum Algorithm {
  DFS,
  BFS,
  RecursiveDFS
};

export type CellObj = {
  row: number;
  col: number;
  key: number;
  mine: Boolean;
  adjMines: number;
  covered: Boolean;
  flagged: Boolean;
};

export type CellGrid = CellObj[][];

export type Dimension = [number, number];