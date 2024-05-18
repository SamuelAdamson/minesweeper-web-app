import { useState } from 'react';
import { Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Algorithm } from '../Game/components/type';
import styles from './Algo.module.css';

enum AlgoDisplay {
  Performance,
  Text
}

type Props = {
  algo: Algorithm;
  onAlgoChange: Function;
  display?: AlgoDisplay;
};

const algos: [Algorithm, Algorithm] = [
  Algorithm.DFS, Algorithm.BFS
];

const algoName: {[key in Algorithm]: string} = {
  [Algorithm.DFS]: 'dfs',
  [Algorithm.BFS]: 'bfs',
};

const algoSource: {[key in Algorithm]: string} = {
[Algorithm.DFS]:
`function DFS(
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
}`,
[Algorithm.BFS]:
`function BFS(
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
}`,
};

export const Algo = ({ algo, onAlgoChange }: Props) => {
  const [algoValue, setAlgoValue] = useState<Algorithm>(algo);

  const onNewAlgo = (algorithm: Algorithm) => {
    onAlgoChange(algorithm);
    setAlgoValue(algorithm);
  };

  return(
    <Container fluid className={styles.algo}>
      <ButtonGroup className={styles.algoButtonGroup} id="algorithm-select-group" aria-label="algorithm-select-group">
        {algos.map((a: Algorithm, idx: Number) => (
          <ToggleButton
            className={styles.algoButton}
            key={`algorithm-${idx}`}
            id={`algorithm-${idx}`}
            type="radio"
            name="algo-radio"
            value={a}
            checked={a == algoValue}
            onClick={(e) => onNewAlgo(a)}
          >
            {algoName[a]}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Container>
  );
};