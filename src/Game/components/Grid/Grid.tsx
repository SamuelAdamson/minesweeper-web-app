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
};

type Dimension = [number, number];

type GridSizes = {
  easy: Dimension;
  medium: Dimension;
  hard: Dimension;
};

type MineCounts = {
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

const mineCount: MineCounts = {
  easy: 10,
  medium: 40,
  //hard: 80
  hard: 0
};

function getGridWrapperStyle(mode: Mode) : string {
  let style: string = (mode == 'easy') ? styles.gridWrapperEasy 
      : (mode == 'medium') ? styles.gridWrapperMedium : styles.gridWrapperHard;

  return cx(styles.gridWrapper, style);
}

export const Grid = ({ mode, paused, resetFlag, onLoadComplete }: Props) => {
  const [firstClick, setFirstClick] = useState<Boolean>(true);
  const [dimensions, setDimensions] = useState<Dimension>(gridSizes[mode]);

  const [grid, setGrid] = useState<CellGrid>([[]]);
  const [loading, setLoading] = useState<boolean>(false);
  const isMounted = useRef<Boolean>(false);

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

    // uncover cells
    // uncover(grid, cell, dimensions[0], dimensions[1]);
  }

  const cellRightClicked = (cell: CellObj) => {  }

  useEffect(() => {
    if(isMounted.current) setLoading(true);
    else isMounted.current = true;
    setGridWrapperStyle(getGridWrapperStyle(mode));

    let newDimensions = gridSizes[mode];
    let newGrid = createGrid(newDimensions[0], newDimensions[1], mode);
    placeMines(newDimensions[0], newDimensions[1], newGrid, mineCount[mode]);

    setDimensions(newDimensions);
    setFirstClick(true);
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
                    onClick={cellClicked}
                    onRightClick={cellRightClicked}
                    mode={mode}
                    paused={paused}
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
