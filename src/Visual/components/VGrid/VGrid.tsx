import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Dimension } from '../../../Game/components/type';
import { VCellObj, VCellGrid } from '../type';
import { createGrid } from './helper'
import styles from './VGrid.module.css';

const gridSize: Dimension = [12, 16];

export const VGrid = () => {
  const [grid, setGrid] = useState<VCellGrid>(createGrid(gridSize[0], gridSize[1]));

  return (
    <Container fluid className={styles.grid}>
      <div className={styles.gridWrapper}>
        <Container fluid className={styles.gridField}>
          
        </Container>
      </div>
    </Container>
  );
};