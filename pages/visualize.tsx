import type { NextPage } from 'next';
import { useState } from 'react';
import { Visual, Algo } from '../src';
import { Algorithm } from '../src/Game/components/type';

const Visualize: NextPage = () => {
  const [algo, setAlgo] = useState<Algorithm>(0);
  const algoChange = (newAlgo: Algorithm) => { setAlgo(newAlgo); };

  return(
    <>
      <Visual />
      <Algo algo={algo} onAlgoChange={algoChange} full/>
    </>
  )
}

export default Visualize;