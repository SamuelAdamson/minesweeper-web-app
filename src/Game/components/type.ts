import { Dispatch, SetStateAction } from 'react';

export type Mode = 'easy' | 'medium' | 'hard';
export type AdjacentStr = 'zero' | 'one' | 'two' | 'three' | 'fourplus';

export type CellObj = {
  row: number;
  col: number;
  key: number;
  mine: Boolean;
  adjacentNum: number;
  covered: Boolean;
  flagged: Boolean;
};

export type CellGrid = CellObj[][];