import { useEffect, useState, useRef, CSSProperties } from 'react';
import { Container, Row } from 'react-bootstrap';
import { BarLoader } from 'react-spinners'
import { Cell } from '..';
import { Mode, CellGrid, CellObj } from '../type';
import { createGrid, placeMines, replaceMine, uncover } from './helper';
import styles from './Grid.module.css';
import cx from 'classnames';


type Props = {
  mode: Mode;
  paused: Boolean;
  resetFlag: Boolean;
  onLoadComplete: Function;
  onGameEnd: Function;
};

type Dimension = [number, number];

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
  medium: 40,
  hard: 80
};

function getGridWrapperStyle(mode: Mode) : string {
  let style: string = (mode == 'easy') ? styles.gridWrapperEasy 
      : (mode == 'medium') ? styles.gridWrapperMedium : styles.gridWrapperHard;

  return cx(styles.gridWrapper, style);
}

export const Grid = ({ mode, paused, resetFlag, onLoadComplete, onGameEnd }: Props) => {
  const [firstClick, setFirstClick] = useState<Boolean>(true);
  const [gameOver, setGameOver] = useState<Boolean>(false);

  const [dimensions, setDimensions] = useState<Dimension>(gridSizes[mode]);
  const [flags, setFlags] = useState<number>(0);

  const [grid, setGrid] = useState<CellGrid>([[]]);
  const [loading, setLoading] = useState<boolean>(false);

  const [gridWrapperStyle, setGridWrapperStyle] = useState<string>(getGridWrapperStyle(mode));

  const loaded = (): void => {
    setLoading(false);
    onLoadComplete();
  }

  const cellClicked = (cell: CellObj) => {
    if(firstClick) {
      setFirstClick(false);
      if(cell.mine) replaceMine(cell, dimensions[0], dimensions[1], grid);
    }

    // make a shallow copy of the current state of the grid
    let ng = [...grid];

    if(cell.mine) {
      ng[cell.row][cell.col].covered = false;
      
      // game loss
      setGameOver(true);
      onGameEnd(false);
    }
    else setFlags(uncover(ng, cell, dimensions[0], dimensions[1], flags));

    setGrid(ng);
  }

  const cellRightClicked = (cell: CellObj) => { 
    if(!cell.flagged && flags < mineCount[mode]) {
      let ng = [...grid];
      ng[cell.row][cell.col].flagged = true;

      setFlags((flags) => flags + 1);
      setGrid(ng);
    }
    else if(cell.flagged) {
      let ng = [...grid];
      ng[cell.row][cell.col].flagged = false;

      setFlags((flags) => flags - 1);
      setGrid(ng);
    }

    console.log(flags);
  }

  useEffect(() => {
    setLoading(true);
    setGridWrapperStyle(getGridWrapperStyle(mode));

    let newDimensions = gridSizes[mode];
    let newGrid = createGrid(newDimensions[0], newDimensions[1], mode);
    placeMines(newDimensions[0], newDimensions[1], newGrid, mineCount[mode]);

    setDimensions(newDimensions);
    setFirstClick(true);
    setGameOver(false);
    setFlags(0);
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
