import type { NextPage } from 'next';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Game, Algo } from '../src';
import { Algorithm } from '../src/Game/components/type';

const Home: NextPage = () => {
  const [algo, setAlgo] = useState<Algorithm>(Algorithm.DFS);
  const algoChange = (newAlgo: Algorithm) => { setAlgo(newAlgo); };

  return (
    <Container fluid style={{padding: 0}}>
      <Row>
        <Col md={12} lg={9}>
          <Game algo={algo} />
        </Col>
        <Col md={12} lg={3} style={{display: 'flex', alignItems: 'center'}}>
          <Algo algo={algo} onAlgoChange={algoChange} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
