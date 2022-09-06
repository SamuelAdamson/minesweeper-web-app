import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { formatTime } from './helper'
import cx from 'classnames';
import styles from './Control.module.css';

type Props = {
  onPause: Function;
  onUnpause: Function;
  onReset: Function;
}

export type TimeDisplay = {
  hours: string;
  minutes: string;
  seconds: string
}


export const Control = ({ onPause, onUnpause, onReset }: Props) => {
  const [paused, setPaused] = useState<Boolean>(false);
  const [elapsed, setElapsed] = useState<number>(0);
  const [time, setTime] = useState<TimeDisplay>({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });


  const pauseClick = (pauseStatus: Boolean) => {
    setPaused(pauseStatus);
    if(pauseStatus) {
      onPause();
    }
    else {
      onUnpause();
    }
  }

  const resetClick = () => {
    onReset();
    setElapsed(0);
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined = undefined;

    if(!paused) {
      interval = setInterval(() => {
        setElapsed(prevElapsed => prevElapsed + 1);
      }, 1000);
    }
    else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);

  }, [paused])

  useEffect(() => {
    setTime(formatTime(elapsed));
  }, [elapsed])

  return(
    <Container fluid className={styles.control}>
      <Row className={styles.controlRow}>
        <Col xs={12} sm={12} md lg xl={6} className={cx(styles.controlCol, styles.left)}>
          <h3>{`${time.hours}:${time.minutes}:${time.seconds}`}</h3>
        </Col>
        <Col xs={12} sm={12} md lg xl={6} className={cx(styles.controlCol, styles.right)}>
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
                paused 
                  ? cx(styles.controlBtn, styles.selected)
                  : styles.controlBtn
              }
            >
              {paused ? 'unpause' : 'pause'}
            </Button>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}