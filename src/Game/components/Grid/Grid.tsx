import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Cell } from "..";
import { Mode, CellGrid } from "../type";

type Props = {
  mode: Mode;
};

type Dimension = [number, number];

type GridSizes = {
  easy: Dimension;
  medium: Dimension;
  hard: Dimension;
};

const gridSize: GridSizes = {
  easy: [8, 12],
  medium: [12, 16],
  hard: [16, 20],
};

export const Grid = ({ mode }: Props) => {
  const [dimensions, setDimensions] = useState<Dimension>(gridSize[mode]);
  const [grid, setGrid] = useState<CellGrid>([[]]);

  useEffect(() => {}, []);

  return <Container fluid>{}</Container>;
};
