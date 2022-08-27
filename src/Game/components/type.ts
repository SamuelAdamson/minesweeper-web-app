export type Mode = 'easy' | 'medium' | 'hard';
export type AdjacentStr = 'zero' | 'one' | 'two' | 'three' | 'fourplus';

export type CellObj = {
  mode: Mode;
  mine: Boolean;
  adjacentNum: Number;
};
export type CellGrid = CellObj[][];
