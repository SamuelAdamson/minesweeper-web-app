import type { NextPage } from 'next';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Game, Algo } from '../src';
import { Algorithm } from '../src/Game/components/type';

const Home: NextPage = () => {
  const [algo, setAlgo] = useState<Algorithm>(0);
  const algoChange = (newAlgo: Algorithm) => { setAlgo(newAlgo); };

  return (
    <Container fluid style={{padding: 0}}>
      <Row>
        <Col xs={12} sm={12} md={12} lg={9} xl={9} xxl={10}>
          <Game algo={algo} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={2}
          style={{display: 'flex', alignItems: 'center'}}
        >
          <Algo algo={algo} onAlgoChange={algoChange} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
