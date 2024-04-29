import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { formatTime } from './helper'
import cx from 'classnames';
import styles from './Control.module.css';

type Props = {
  onPause: Function;
  onUnpause: Function;
  onReset: Function;
  elapsedFlag: Boolean;
  loaded: Boolean;
  gameOver: Boolean;
}

export type TimeDisplay = {
  hours: string;
  minutes: string;
  seconds: string
}


export const Control = ({ onPause, onUnpause, onReset, elapsedFlag, loaded, gameOver }: Props) => {
  const [paused, setPaused] = useState<Boolean>(false);


  const pauseClick = (pauseStatus: Boolean) => {
    setPaused(pauseStatus);
    if(pauseStatus) onPause();
    else onUnpause();
  }

  const resetClick = () => {
    onReset();
  }


  return(
    <Container fluid className={styles.control}>
      <Container fluid className={styles.controlBtnGroup}>
        <Button 
          className={styles.controlBtn}
          onClick={resetClick}
        >
          reset
        </Button>
        <Button 
          onClick={() => pauseClick(!paused)}
          className={
            gameOver 
            ? cx(styles.controlBtn, styles.gameOver)
            : paused 
                ? cx(styles.controlBtn, styles.selected)
                : styles.controlBtn
          }
        >
          {paused ? 'unpause' : 'pause'}
        </Button>
      </Container>
    </Container>
  );
}