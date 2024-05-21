import type { NextPage } from 'next';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Game, Algo } from '../src';
import { Algorithm, Cascade } from '../src/Game/components/type';

const Home: NextPage = () => {
  const [algo, setAlgo] = useState<Algorithm>(Algorithm.DFS);
  const [newCascade, setNewCascade] = useState<Cascade | null>(null);
  const [resetFlag, setResetFlag] = useState<Boolean>(false);

  const algoChange = (newAlgo: Algorithm) => setAlgo(newAlgo);
  const handleCascade = (cascade: Cascade) => setNewCascade(cascade);
  const handleReset = (reset: Boolean) => setResetFlag(reset);

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

        </Col>
      </Row>
      
    </Container>
  );
};

export default Home;
