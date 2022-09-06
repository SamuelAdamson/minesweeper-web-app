import { useEffect, useState, useRef, ReactElement, CSSProperties } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ScaleLoader } from 'react-spinners'
import { Cell } from '..';
import { Mode, CellGrid, CellObj } from '../type';
import { throttle, createGrid, placeMines } from './helper';
import styles from './Grid.module.css';

type Props = {
  mode: Mode;
  paused: Boolean;
};

type Dimension = [number, number];

type GridSizes = {
  easy: Dimension;
  medium: Dimension;
  hard: Dimension;
};

type MineCounts = {
  easy: Number;
  medium: Number;
  hard: Number;
};

const gridSize: GridSizes = {
  easy: [8, 12],
  medium: [12, 16],
  hard: [16, 20],
};

const mines: MineCounts = {
  easy: 10,
  medium: 40,
  hard: 80,
};

export const Grid = ({ mode, paused }: Props) => {
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
    setOverlayHeight(0);
    setOverlayWidth(0);
  }

  useEffect(() => {
    if(isMounted.current && gridRef.current) setLoading(true);
    else isMounted.current = true;

    if(gridRef.current) {
      setOverlayHeight(gridRef.current.clientHeight);
      setOverlayWidth(gridRef.current.clientWidth);
    }

    let dimensions: Dimension = gridSize[mode];
    let newGrid = createGrid(dimensions[0], dimensions[1], mode);
    
    placeMines(dimensions[0], dimensions[1], newGrid, mines[mode]);
    setGrid(newGrid);
  }, [mode]);

  useEffect(() => {
    throttle(loaded, 500);
  }, [grid])

  return (
    <Container fluid className={styles.grid}>
      <div className={styles.overlay} style={overlayStyle}>
        <ScaleLoader 
          loading={loading}
          color="black"
          height={150}
          width={12}
          radius={3}
        />
      </div>
      <div className={styles.gridWrapper} ref={gridRef}>
        {!loading ? (
          <Container fluid className={styles.gridField}>
            {grid.map((row: CellObj[], rowNum: Number) => (
              <Row className={styles.cellRow} key={`${rowNum}`}>
                {row.map((cell: CellObj, colNum: Number) => (
                  <Cell
                    key={`${rowNum}${colNum}`}
                    mode={cell.mode}
                    mine={cell.mine}
                    adjacentNum={cell.adjacentNum}
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
