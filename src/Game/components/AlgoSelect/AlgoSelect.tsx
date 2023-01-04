import { useState } from 'react';
import {
  Container,
  ToggleButton,
  ButtonGroup,
} from 'react-bootstrap';
import { Algorithm } from '../type';
import styles from './AlgoSelect.module.css';

type Props = {
  algo: Algorithm;
  onAlgoChange: Function;
};

// 0 -> DFS
// 1 -> BFS
// 2 -> Recursive DFS
const algoI: Array<Algorithm> = [0, 1, 2];
const algos: Array<[String, String]> = [
  ['DFS', 'Depth-First Search'],
  ['BFS', 'Breadth-First Search'],
  ['Recursive DFS', 'Recursive Depth-First Search'],
];

const algoCode: Array<String> = [
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
`function recursiveDFS(
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
}`,
];

export const AlgoSelect = ({ algo, onAlgoChange }: Props) => {
  const [algoValue, setAlgoValue] = useState<Algorithm>(algo);
  const onNewAlgo = (algorithm: Algorithm) => {
    onAlgoChange(algorithm);
    setAlgoValue(algorithm);  
  };

  return(
    <Container fluid className={styles.AlgoSelect}>
      <ButtonGroup aria-label="algo-select-group">
        {algoI.map((i: Algorithm) => (
          <ToggleButton
            className={styles.AlgoButton}
            key={`algo-${i}`}
            id={`algo-${i}`}
            type="radio"
            name="algo-radio"
            value={i}
            checked={i == algoValue}
            onClick={(e) => onNewAlgo(i)}
          >
            <h6>{algos[i][0]}</h6>
            <p>{algos[i][1]}</p>
          </ToggleButton>

        ))}
      </ButtonGroup>
    </Container>
  );
};