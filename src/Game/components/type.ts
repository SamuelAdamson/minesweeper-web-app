export type Mode = 'easy' | 'medium' | 'hard';
export type AdjacentStr = 'zero' | 'one' | 'two' | 'three' | 'fourplus';

export type CellObj = {
  row: number;
  col: number;
  mode: Mode;
  mine: Boolean;
  covered: Boolean;
  adjacentNum: number;
};
export type CellGrid = CellObj[][];
