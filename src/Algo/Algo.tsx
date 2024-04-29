import { useState } from 'react';
import { Container, Dropdown, SSRProvider } from 'react-bootstrap';
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

const algoTexts: {[key in Algorithm]: string} ={
[Algorithm.DFS]: 
'Depth-first search invovles traversing a path of cells \
(or nodes) as far as possible until conditions no longer satisfy the \
search or the target is reached.',
[Algorithm.BFS]:
'Breadth-first search traverses cells (or nodes) in layers \
where each layer is equidistant from the source of the search. \
Cells in closer proximity to the source will be evaluated first.',
}

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

export const Algo = ({ algo, onAlgoChange, display=AlgoDisplay.Text }: Props) => {
  const [algoValue, setAlgoValue] = useState<Algorithm>(algo);

  const onNewAlgo = (algorithm: Algorithm) => {
    onAlgoChange(algorithm);
    setAlgoValue(algorithm);
  };

  /* New plan here
  
    Create a drop down accordion for this componenet (Only vertical configuration, no longer full and non-full)
    Two different options for algo -- Performance and Text

    Performance shows a small graph with live updating performance metrics for the last 5 runs of the algorithm
    Text gives a short description with an option to copy and paste the source code (source code is not displayed)
  */

  return(
    <Container fluid className={styles.algo}>
      <SSRProvider>
        <Dropdown>
          <Dropdown.Toggle className={styles.algoToggle}>{algoName[algo]}</Dropdown.Toggle>
          <Dropdown.Menu className={styles.algoMenu}>
            {algos.map(a => (
              <Dropdown.Item
                key={`algo-${a}`}
                className={styles.algoMenuItem}
                onClick={(_e) => onNewAlgo(a)}
              >
                {algoName[a]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </SSRProvider>
      {(display == AlgoDisplay.Text) ?
        <Container className={styles.algoText}>
          <p style={{marginBottom: 0}}>{algoTexts[algo]}</p>
        </Container>
      : null}
    </Container>
  );
};