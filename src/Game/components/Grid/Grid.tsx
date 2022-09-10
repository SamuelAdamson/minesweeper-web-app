import { useEffect, useState, useRef, ReactElement, CSSProperties } from 'react';
import { Container, Row } from 'react-bootstrap';
import { BarLoader } from 'react-spinners'
import { Cell } from '..';
import { Mode, CellGrid, CellObj } from '../type';
import { createGrid, placeMines, replaceMine } from './helper';
import styles from './Grid.module.css';

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
  hard: 80,
};

export const Grid = ({ mode, paused, resetFlag, onLoadComplete }: Props) => {
  const [firstClick, setFirstClick] = useState<Boolean>(true);
  const [numMines, setNumMines] = useState<number>(mineCount[mode]);
  const [dimensions, setDimensions] = useState<Dimension>(gridSizes[mode]);

  const [overlayHeight, setOverlayHeight] = useState<number>(0);
  const [overlayWidth, setOverlayWidth] = useState<number>(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const overlayStyle: CSSProperties = {
    '--height': `${overlayHeight}px`,
    '--width': `${overlayWidth}px`
  } as CSSProperties;

  const [grid, setGrid] = useState<CellGrid>([[]]);
  const [loading, setLoading] = useState<boolean>(false);
  const isMounted = useRef<Boolean>(false);

  const loaded = (): void => {
    setLoading(false);
    onLoadComplete();
    setOverlayHeight(0);
    setOverlayWidth(0);
  }

  useEffect(() => {
    if(isMounted.current) setLoading(true);
    else isMounted.current = true;

    if(gridRef.current) {
      setOverlayHeight(gridRef.current.clientHeight);
      setOverlayWidth(gridRef.current.clientWidth);
    }

    let newDimensions: Dimension = gridSizes[mode];
    let newGrid = createGrid(newDimensions[0], newDimensions[1], mode);
    placeMines(newDimensions[0], newDimensions[1], newGrid, mineCount[mode]);

    setNumMines(mineCount[mode]);
    setDimensions(newDimensions);
    setGrid(newGrid);

    console.log("Grid useeffect")
  }, [mode, resetFlag]);

  useEffect(() => {
    loaded();
  }, [grid])

  const cellClicked = (cell: CellObj) => {
    if(firstClick) {
      setFirstClick(false);
      if(cell.mine) replaceMine(cell, dimensions[0], dimensions[1], grid);
    }
    cell.covered = false;
  }

  const cellRightClicked = (cell: CellObj) => {

  }

  return (
    <Container fluid className={styles.grid}>
      <div className={styles.overlay} style={overlayStyle}>
        <BarLoader 
          loading={loading}
          color="teal"
          cssOverride={loaderOverride}
          height={10}
          width={200}
        />
      </div>
      <div className={styles.gridWrapper}>
        {!loading ? (
          <Container fluid className={styles.gridField} ref={gridRef}>
            {grid.map((row: CellObj[], rowNum: number) => (
              <Row className={styles.cellRow} key={`${rowNum}`}>
                {row.map((cell: CellObj, colNum: number) => (
                  <Cell
                    key={`${rowNum}${colNum}`}
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
        ) : null}
      </div>
    </Container>
  );
};
