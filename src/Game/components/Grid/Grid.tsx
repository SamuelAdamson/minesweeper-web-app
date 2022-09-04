import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Cell } from '..';
import { Mode, CellGrid, CellObj } from '../type';
import { createGrid, placeMines } from './helper';
import { ScaleLoader } from 'react-spinners'
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

  useEffect(() => {
    let dimensions: Dimension = gridSize[mode];
    let newGrid = createGrid(dimensions[0], dimensions[1], mode);
    placeMines(dimensions[0], dimensions[1], newGrid, mines[mode]);
    setGrid(newGrid);
  }, [mode]);

  return (
    <div className={styles.gridWrapper}>
      <Container fluid className={styles.grid}>
        {grid.map((row: CellObj[], rowNum: Number) => (
          <Row className={styles.cellRow} key={`${rowNum}`}>
            {row.map((cell: CellObj, colNum: Number) => (
              <Cell
                key={`${rowNum}${colNum}`}
                row={rowNum}
                col={colNum}
                mode={cell.mode}
                mine={cell.mine}
                adjacentNum={cell.adjacentNum}
              />
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
};
