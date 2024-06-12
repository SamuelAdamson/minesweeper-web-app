import { useEffect, useState, useRef } from 'react';
import { Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Cascade, Clear, Algorithm } from '../index';
import styles from './Algo.module.css';

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
  const [messages, setMessages] = useState<JSX.Element[]>([]);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const messageAnchor = useRef<HTMLDivElement>(null);

  const onNewAlgo = (algorithm: Algorithm) => 
    onAlgoChange(algorithm);

  const scrollToBottom = () => 
    messageAnchor.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });

  const addToMessages = (newMessage: JSX.Element) => {
    const indexedNewMessage: JSX.Element = <p key={`message-${messageIndex}`}>{newMessage}</p>;
    setMessageIndex(prevIndex => prevIndex + 1);
    setMessages(prevMessages => [...prevMessages, indexedNewMessage]);
  }

  const resetMessages = () => {
    setMessages([]);
    const algoName = algoNames[algo].toLocaleUpperCase();

    addToMessages(
      <>Cascade algorithm set to <span className={styles.highlight}>{algoName}</span>.</>
    );
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
    if(!newCascade) return;
    const algoName = algoNames[algo].toLocaleUpperCase();

    console.log(newCascade);

    newCascade.times.forEach((time) => {
      if(time == 0) {
        addToMessages(
          <>A cascade executed using <span className={styles.highlight}>{algoName}</span>, 
          but its execution time was too quick to measure in the browser.</>
        );
      }
      else {
        addToMessages(
          <>A cascade executed in <span className={styles.highlight}>{time.toFixed(2)} ms</span> using 
          <span className={styles.highlight}> {algoName}</span>.</>
        );
      }
    });

  }, [newCascade]);

  /* Scroll to bottom when new message is added */
  useEffect(() => scrollToBottom(), [messages]);

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
      
      <div className={styles.messageBoxWrapper}>
        <div className={styles.messageBoxHeader}>
          <Clear onClear={resetMessages}></Clear>
        </div>
        <div className={styles.messageBox}>
          {messages}
          <div ref={messageAnchor}></div>
        </div>
      </div>

    </Container>
  );
};
