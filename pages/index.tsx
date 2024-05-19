import type { NextPage } from 'next';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Game, Algo } from '../src';
import { Algorithm, Cascade } from '../src/Game/components/type';

const Home: NextPage = () => {
  const [algo, setAlgo] = useState<Algorithm>(Algorithm.DFS);
  const [newCascade, setNewCascade] = useState<Cascade | null>(null);

  const algoChange = (newAlgo: Algorithm) => { setAlgo(newAlgo); };
  const handleCascade = (cascade: Cascade) => { setNewCascade(cascade) }

  return (
    <Container fluid style={{padding: 0}}>
      <Row>
        <Col md={12} lg={9}>
          <Game algo={algo} onCascade={handleCascade} />
        </Col>
        <Col md={12} lg={3} style={{display: 'flex', alignItems: 'center'}}>
          <Algo algo={algo} newCascade={newCascade} onAlgoChange={algoChange} />
        </Col>
      </Row>
      
    </Container>
  );
};

export default Home;
