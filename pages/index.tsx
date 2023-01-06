import type { NextPage } from 'next';
import { useState } from 'react';
import { Game, Algo } from '../src';
import { Algorithm } from '../src/Game/components/type';

const Home: NextPage = () => {
  const [algo, setAlgo] = useState<Algorithm>(0);
  const algoChange = (newAlgo: Algorithm) => { setAlgo(newAlgo); };

  return (
    <>
      <Game algo={algo} />
      <Algo algo={algo} onAlgoChange={algoChange} />
    </>
  );
};

export default Home;
