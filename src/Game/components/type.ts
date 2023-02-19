export type Mode = 'easy' | 'medium' | 'hard';
export type AdjacentStr = 'zero' | 'one' | 'two' | 'three' | 'fourplus';
export type Uncover = [number, number];

export type Algorithm = 0 | 1 | 2 | 3;
// 0 -> DFS
// 1 -> BFS
// 2 -> Recursive DFS
// 3 -> Iterative Depth DFS

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