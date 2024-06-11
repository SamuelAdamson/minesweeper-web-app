import type { NextPage } from 'next';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Game, Algo, Algorithm, Cascade, ChartData, Chart } from '../src';

const Home: NextPage = () => {
  const [algo, setAlgo] = useState<Algorithm>(Algorithm.DFS);
  const [resetFlag, setResetFlag] = useState<Boolean>(false);
  const [newCascade, setNewCascade] = useState<Cascade | null>(null);
  // const [cascadeData, setCascadeData] = useState<ChartData>([]);

  const algoChange = (newAlgo: Algorithm) => setAlgo(newAlgo);
  const handleReset = (reset: Boolean) => setResetFlag(reset);

  const handleCascade = (cascade: Cascade) => {
    setNewCascade(cascade);
  }

  return (
    <Container fluid style={{padding: 0}}>
      <Row>
        <Col md={12} lg={9}>
          <Game algo={algo} onCascade={handleCascade} onReset={handleReset} />
        </Col>
        <Col md={12} lg={3} style={{display: 'flex', alignItems: 'center'}}>
          <Algo algo={algo} resetFlag={resetFlag} newCascade={newCascade} onAlgoChange={algoChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Chart data={[]}>

          </Chart>
        </Col>
      </Row>
      
    </Container>
  );
};

export default Home;
