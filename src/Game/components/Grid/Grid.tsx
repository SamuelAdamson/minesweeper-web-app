import { useEffect, useState, useRef, ReactElement } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ScaleLoader } from 'react-spinners'
import { Cell } from '..';
import { Mode, CellGrid, CellObj } from '../type';
import { createGrid, placeMines } from './helper';
import styles from './Grid.module.css';

type Props = {
  mode: Mode;
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

export const Grid = ({ mode }: Props) => {
  const [grid, setGrid] = useState<CellGrid>([[]]);
  const [loading, setLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState<ReactElement>();
  const isMounted = useRef(false);

  useEffect(() => {
    if(isMounted.current) {
      setLoading(true);
    }
    else {
      isMounted.current = true;
    }

    let dimensions: Dimension = gridSize[mode];
    let newGrid = createGrid(dimensions[0], dimensions[1], mode);
    placeMines(dimensions[0], dimensions[1], newGrid, mines[mode]);
    setGrid(newGrid);
  }, [mode]);

  useEffect(() => {
    setDisplay(
      <Container fluid className={styles.gridField}>
        {grid.map((row: CellObj[], rowNum: Number) => (
          <Row className={styles.cellRow} key={`${rowNum}`}>
            {row.map((cell: CellObj, colNum: Number) => (
              <Cell
                key={`${rowNum}${colNum}`}
                mode={cell.mode}
                mine={cell.mine}
                adjacentNum={cell.adjacentNum}
              />
            ))}
          </Row>
        ))}
      </Container>
    );

    if(isMounted.current) {
      setTimeout(() => {
        setLoading(false);
      }, 750);
    }
  }, [grid])

  return (
    <Container fluid className={styles.grid}>
      <ScaleLoader color="black" loading={loading} />
      <div className={styles.gridWrapper}>
        {!loading ? display : null}
      </div>
    </Container>
  );
};
