import { useState, MouseEvent } from 'react';
import { Container, ToggleButton, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { CheckSquareFill as CopyIcon } from 'react-bootstrap-icons';
import { Code } from '../';
import { Algorithm } from '../Game/components/type';
import cx from 'classnames';
import styles from './Algo.module.css';

type Props = {
  algo: Algorithm;
  onAlgoChange: Function;
};

// 0 -> DFS
// 1 -> BFS
// 2 -> Recursive DFS
const algoI: Array<Algorithm> = [0, 1, 2];
const algos: Array<String> = ['dfs', 'bfs', 'recursive dfs'];

const algoCode: Array<string> = [
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

export const Algo = ({ algo, onAlgoChange }: Props) => {
  const [algoValue, setAlgoValue] = useState<Algorithm>(algo);
  const [copy, setCopy] = useState<Boolean>(false);

  const onNewAlgo = (algorithm: Algorithm) => {
    onAlgoChange(algorithm);
    setAlgoValue(algorithm);  
  };

  const onCopy = (_e: MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(algoCode[algoValue]);
    
    setCopy(true);
    setTimeout(() => { setCopy(false) }, 3000);
  }

  return(
    <Container fluid className={styles.algo}>
      <Row className={styles.algoRow}>
        <Col xs={12} sm={12} md lg xl={6} className={styles.algoBtnCol}>
          <ButtonGroup aria-label="algo-select-group">
            {algoI.map((i: Algorithm) => (
              <ToggleButton
                className={styles.algoBtn}
                key={`algo-${i}`}
                id={`algo-${i}`}
                type="radio"
                name="algo-radio"
                value={i}
                checked={i == algoValue}
                onClick={(_e) => onNewAlgo(i)}
              >
                {algos[i]}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
        <Col xs={12} sm={12} md lg xl={6} className={styles.copyBtnCol}>
          <Button className={cx(styles.controlBtn, copy ? styles.selected : null)} onClick={onCopy}>
            {copy ? <CopyIcon /> : 'copy'}
          </Button>
        </Col>
      </Row>

      <Code 
        code={algoCode[algoValue]}
        centered={false}
        language='javascript'
      />
    </Container>
  );
};