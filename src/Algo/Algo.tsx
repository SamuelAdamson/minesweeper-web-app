import { useEffect, useState } from 'react';
import { Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Algorithm, Cascade } from '../Game/components/type';
import styles from './Algo.module.css';

enum AlgoDisplay {
  Performance,
  Text
}

type Props = {
  algo: Algorithm;
  newCascade: Cascade | null;
  onAlgoChange: Function;
};

const algos: [Algorithm, Algorithm] = [
  Algorithm.DFS, Algorithm.BFS
];

const algoNames: {[key in Algorithm]: string} = {
  [Algorithm.DFS]: 'dfs',
  [Algorithm.BFS]: 'bfs',
};

export const Algo = ({ algo, newCascade, onAlgoChange }: Props) => {
  const onNewAlgo = (algorithm: Algorithm) => { onAlgoChange(algorithm); };
  const [messages, setMessages] = useState<JSX.Element[]>([]);
  const [messageIndex, setMessageIndex] = useState<number>(0);

  const addToMessages = (newMessage: JSX.Element) => {
    const indexedNewMessage: JSX.Element = <p key={`message-${messageIndex}`}>{newMessage}</p>;
    setMessageIndex(prevIndex => prevIndex + 1);
    setMessages(prevMessages => [...prevMessages, indexedNewMessage]);
  }

  // DEBUG ONLY
  useEffect(() => {
    setMessages([]);
  }, []);

  /* Add new algo message to message box */
  useEffect(() => {
    const algoName = algoNames[algo].toLocaleUpperCase();

    addToMessages(
      <>Cascade algorithm set to <span className={styles.highlight}>{algoName}</span>.</>
    );
  }, [algo]);

  /* Add new cascade message to message box */
  useEffect(() => {
    if(!newCascade) return; // Ignore null messages (initial render)

    

  }, [newCascade]);

  return(
    <Container fluid className={styles.algo}>
      <ButtonGroup className={styles.algoButtonGroup} id="algorithm-select-group" aria-label="algorithm-select-group">
        {algos.map((a: Algorithm, idx: Number) => (
          <ToggleButton
            className={styles.algoButton}
            key={`algorithm-${idx}`}
            id={`algorithm-${idx}`}
            type="radio"
            name="algo-radio"
            value={a}
            checked={a == algo}
            onClick={(e) => onNewAlgo(a)}
          >
            {algoNames[a]}
          </ToggleButton>
        ))}
      </ButtonGroup>
      
      <div className={styles.messageBox}>
        {messages}
      </div>

    </Container>
  );
};