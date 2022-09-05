import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import cx from 'classnames';
import styles from './Control.module.css';

type Props = {
  onPause: Function;
  onUnpause: Function;
}

export const Control = ({ onPause, onUnpause }: Props) => {
  const [paused, setPaused] = useState<Boolean>(false);
  const [time, setTime] = useState<String>('00:00:00');

  const pauseClick = () => {
    setPaused(!paused);
  }

  return(
    <Container fluid className={styles.control}>
      <Row>
        <Col xs={12} sm={12} md lg xl={6} className={cx(styles.controlCol, styles.left)}>
          <h3>{time}</h3>
        </Col>
        <Col xs={12} sm={12} md lg xl={6} className={cx(styles.controlCol, styles.right)}>
          <Button 
            onClick={pauseClick}
            className={
              paused 
                ? cx(styles.controlBtn, styles.selected)
                : styles.controlBtn
            }
          >
            {paused ? 'unpause' : 'pause'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}