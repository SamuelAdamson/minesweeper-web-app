import type { NextPage } from 'next';
import { useState } from 'react';
import { Visual } from '../src';
import { Algorithm } from '../src/Game/components/type';

const Visualize: NextPage = () => {
  const [algo, setAlgo] = useState<Algorithm>(0);
  const algoChange = (newAlgo: Algorithm) => { setAlgo(newAlgo); };

  return(
    <>
      <Visual />
    </>
  )
}

export default Visualize;