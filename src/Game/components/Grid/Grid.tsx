import { useEffect, useState, CSSProperties } from 'react';
import { Container, Row } from 'react-bootstrap';
import { BarLoader } from 'react-spinners'
import { Cell } from '..';
import { Mode, CellGrid, CellObj, Uncover, Algorithm, Dimension } from '../type';
import {
  createGrid,
  placeMines, replaceMine,
  uncover, uncoverShortcut, 
  placeFlag, removeFlag, 
} from './helper';
import styles from './Grid.module.css';
import cx from 'classnames';


type Props = {
  mode: Mode;
  paused: Boolean;
  resetFlag: Boolean;
  onLoadComplete: Function;
  onGameEnd: Function;
  algo: Algorithm;
};

type GridSizes = {
  easy: Dimension;
  medium: Dimension;
  hard: Dimension;
};

type MineCount = {
  easy: number;
  medium: number;
  hard: number;
};

const loaderOverride: CSSProperties = {
  backgroundColor: 'rgba(57,144,126,0.2)',
  borderRadius: '0.3rem'
}

const gridSizes: GridSizes = {
  easy: [8, 12],
  medium: [12, 16],
  hard: [16, 20],
};

const mineCount: MineCount = {
  easy: 10,
  medium: 30,
  hard: 50
};

function getGridWrapperStyle(mode: Mode) : string {
  let style: string = (mode == 'easy') ? styles.gridWrapperEasy 
      : (mode == 'medium') ? styles.gridWrapperMedium : styles.gridWrapperHard;

  return cx(styles.gridWrapper, style);
}

export const Grid = ({ mode, paused, resetFlag, onLoadComplete, onGameEnd, algo }: Props) => {
  const [firstClick, setFirstClick] = useState<Boolean>(true);
  const [gameOver, setGameOver] = useState<Boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [dim, setDim] = useState<Dimension>([0,0]);
  const [cellCnt, setCellCnt] = useState<number>(0);
  const [flagCnt, setFlagCnt] = useState<number>(0);

  const [grid, setGrid] = useState<CellGrid>([[]]);
  const [gridWrapperStyle, setGridWrapperStyle] = useState<string>(getGridWrapperStyle(mode));

  const loaded = (): void => {
    setLoading(false);
    onLoadComplete();
  }

  const cellClicked = (cell: CellObj) => {
    if(firstClick) {
      setFirstClick(false);
      if(cell.mine) replaceMine(cell, dim[0], dim[1], grid);
    }

    /* Case when cell is uncovered AND not correct number of flags */
    if(!cell.covered && cell.adjFlags != cell.adjMines) {
      return; // Do nothing
    }

    // make a shallow copy of the current state of the grid
    let ng = [...grid];
    let uncoverResult: Uncover;

    /* Make uncover operations */
    if(cell.covered) // Cell is covered
      uncoverResult = uncover(ng, cell, dim[0], dim[1], flagCnt, cellCnt, algo);
    else  // Cell not covered (use shortcut methods)
      uncoverResult = uncoverShortcut(ng, cell, dim[0], dim[1], flagCnt, cellCnt, algo);

    /* Set remaining flag and cell count */
    setFlagCnt(uncoverResult.remainingFlags);
    setCellCnt(uncoverResult.remainingCells);

    /* Check if loss */
    if(uncoverResult.hitMine) {
      setGameOver(true);
      onGameEnd(false); // loss
    }

    /* Check game win (no more mines) */
    if(uncoverResult.remainingCells == 0) {
      setGameOver(true);
      onGameEnd(true);
    }
    
    /* Set new grid */
    setGrid(ng);
  }

  const cellRightClicked = (cell: CellObj) => { 
    // If cell is not flagged (Place flag)
    if(!cell.flagged && flagCnt < mineCount[mode]) {
      let ng = placeFlag(cell, dim[0], dim[1], grid);
      setFlagCnt((flagCnt) => flagCnt + 1);
      setGrid(ng);
    }
    else if(cell.flagged) { // Cell is flagged (Remove flag)
      let ng = removeFlag(cell, dim[0], dim[1], grid);
      setFlagCnt((flagCnt) => flagCnt - 1);
      setGrid(ng);
    }
  }

  useEffect(() => {
    setLoading(true);
    setFirstClick(true);
    setGameOver(false);
    setGridWrapperStyle(getGridWrapperStyle(mode));

    let newDim: Dimension = gridSizes[mode];
    setDim(newDim);

    let newGrid = createGrid(newDim[0], newDim[1], mode);
    placeMines(newDim[0], newDim[1], newGrid, mineCount[mode]);

    setCellCnt(newDim[0] * newDim[1] - mineCount[mode]);
    setFlagCnt(0);
    setGrid(newGrid);
  }, [mode, resetFlag]);

  useEffect(() => {
    setTimeout(() => loaded(), 350);
  }, [grid])

  return (
    <Container fluid className={styles.grid}>
      <div className={gridWrapperStyle}>
        {loading ?
          (
          <div className={styles.loader}>
            <BarLoader 
              loading={loading}
              color="teal"
              cssOverride={loaderOverride}
              height={10}
              width={200}
            />
          </div>
          )
        :
          (
          <Container fluid className={styles.gridField}>
            {grid.map((row: CellObj[], rowNum: number) => (
              <Row className={styles.cellRow} key={`${rowNum}`}>
                {row.map((cell: CellObj) => (
                  <Cell
                    key={`${cell.row}${cell.col}`}
                    cell={cell}
                    mode={mode}
                    paused={paused}
                    gameOver={gameOver}
                    onClick={cellClicked}
                    onRightClick={cellRightClicked}
                  />
                ))}
              </Row>
            ))}
          </Container>
          )
        }
      </div>
    </Container>
  );
};
