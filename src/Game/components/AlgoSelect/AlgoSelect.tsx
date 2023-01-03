import { useState } from 'react';
import {
  Container,
  ToggleButton,
  ButtonGroup,
} from 'react-bootstrap';
import { Button } from 'react-bootstrap/lib/InputGroup';
import { CodeBlock } from '../../../';
import { Algorithm } from '../type';
import styles from './AlgoSelect.module.css';

type Props = {
  algo: Algorithm;
  onAlgoChange: Function;
};

// 0 -> DFS
// 1 -> BFS
// 2 -> Recursive DFS
const algoI: Array<Algorithm> = [0, 1, 2];
const algos: Array<[String, String]> = [
  ['DFS', 'Depth-First Search'],
  ['BFS', 'Breadth-First Search'],
  ['Recursive DFS', 'Recursive Depth-First Search'],
];

const algoCode: Array<String> = [

];

export const AlgoSelect = ({ algo, onAlgoChange }: Props) => {
  const [radioValue, setRadioValue] = useState<Algorithm>(algo);
  const onNewAlgo = (algorithm: Algorithm) => {
    onAlgoChange(algorithm);
    setRadioValue(algorithm);  
  };

  return(
    <Container fluid className={styles.AlgoSelect}>
      <Button>
        {algoI.map((i: Algorithm) => (
          <ToggleButton
            className={styles.AlgoButton}
            key={`algo-${i}`}
            id={`radio-${i}`}
            type="radio"
            name="radio"
            value={i}
            checked={i == radioValue}
            onClick={(e) => onNewAlgo(i)}
          >
            <h5>{algos[i][0]}</h5>
            <p>{algos[i][1]}</p>
            
          </ToggleButton>
        ))}
      </Button>
    </Container>
  );
};